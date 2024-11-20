import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import {
  GenerateAuthenticationOptionsOpts,
  VerifyAuthenticationResponseOpts,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import dotenv from "dotenv";

import User from "../models/userModel";
import { IUser } from '../models/userModel';
import ChallengeModel from "../models/challengeModel";
import { getAuth } from 'firebase-admin/auth';
import { Document } from 'mongoose';
import Onboarding from "../models/userProfile";
type UserDocument = Document & IUser;

dotenv.config();

const rpID = process.env.VITE_PASSKEY_RPID!;
const origin = `https://${rpID}`;

const generateOptions = async (req: Request, res: Response) => {
  const opts: GenerateAuthenticationOptionsOpts = {
    timeout: 60000,
    allowCredentials: [],
    userVerification: "preferred",
    rpID,
  };

  const options = await generateAuthenticationOptions(opts);
  const uuid = crypto.randomUUID();

  await ChallengeModel.create({ uuid, challenge: options.challenge });

  res.json({ options, uuid });
};

const authenticateVerify = async (req: Request, res: Response) => {
  const { uuid }: { uuid: string } = req.body;

  const user = await User.findOne(
    { "credentials.credentialID": req.body.auth.id },
    { "credentials.$": 1 }
  );
  if (!user) {
    res.status(404).send("User not found");
    return;
  }

  // Since we query for one ID and use projection with $ it'll return array with one element
  const credential = user.credentials[0];
  if (!credential) {
    res.status(404).send("Credentials not found");
    return;
  }

  const challengeDoc = await ChallengeModel.findOne({ uuid });
  if (!challengeDoc) {
    res.status(404).send("Expected Challenge not found");
    return;
  }

  let verification;
  try {
    const opts: VerifyAuthenticationResponseOpts = {
      response: req.body.auth,
      expectedChallenge: `${challengeDoc.challengeType}`,
      expectedOrigin: origin,
      expectedRPID: rpID,
      authenticator: {
        credentialID: credential.credentialID,
        credentialPublicKey: new Uint8Array(
          credential.credentialPublicKey.buffer,
          credential.credentialPublicKey.byteOffset,
          credential.credentialPublicKey.byteLength
        ),
        counter: credential.counter,
      },
      requireUserVerification: false,
    };
    verification = await verifyAuthenticationResponse(opts);
  } catch (error) {
    res.status(400).send("Authentication failed");
    return;
  }

  const newCounter = verification.authenticationInfo.newCounter;
  await User.updateOne(
    { _id: user._id, "credentials.credentialID": credential.credentialID },
    { $set: { "credentials.$.counter": newCounter } }
  );

  const token = jwt.sign(
    { id: user._id, username: user.username },
    process.env.VITE_JWT_SECRET!,
    { expiresIn: "4d" }
  );

  res.json({ status: "ok", token, user });
};

const logoutUser = (req: Request, res: Response) => {
  try {
    // Check if the user property is set by the auth middleware, indicating a valid JWT
    if (!req.user) {
      res
        .status(401)
        .send({ message: "Logout failed: No valid token provided" });
      return;
    }
    res.status(200).send({
      message: "Logged out successfully",
      token: "invalid",
      expires: 0,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Logout Error:", error.message, error.stack);
    } else {
      console.error("Logout Error: An unknown error occurred.");
    }
    res.status(500).send({
      message: "Failed to logout",
      error: "An error occurred during logout",
    });
  }
};

const verifyFirebaseToken = async (req: Request, res: Response) => {
  const { token, shadowAccountId } = req.body;

  try {
    const decodedToken = await getAuth().verifyIdToken(token);
    let user = null;
    let profile = null;

    // First check if a Firebase user already exists
    user = await User.findOne({ firebaseUid: decodedToken.uid });
    if (user) {
      profile = await Onboarding.findOne({ userId: user._id });
    }

    if (shadowAccountId) {
      // If we have a shadowAccountId but already have a Firebase user, return existing user
      if (user) {
        const appToken = jwt.sign(
          { id: user._id, username: user.username },
          process.env.VITE_JWT_SECRET!,
          { expiresIn: "4d" }
        );
        return res.json({ 
          status: "ok", 
          token: appToken, 
          user,
          profile 
        });
      }

      // No Firebase user exists, so merge with shadow account
      const shadowUser = await User.findOne({ 
        _id: shadowAccountId, 
        shadowAccount: true 
      });

      if (shadowUser) {
        // Update shadow account with Firebase info
        shadowUser.firebaseUid = decodedToken.uid;
        shadowUser.email = decodedToken.email;
        shadowUser.displayName = decodedToken.name;
        shadowUser.photoURL = decodedToken.picture;
        shadowUser.authProvider = 'firebase';
        shadowUser.shadowAccount = false;
        user = await shadowUser.save();
        profile = await Onboarding.findOne({ userId: user._id });
      }
    }

    // If we still don't have a user, create a new one
    if (!user) {
      user = await User.create({
        username: decodedToken.email || decodedToken.uid,
        firebaseUid: decodedToken.uid,
        email: decodedToken.email,
        displayName: decodedToken.name,
        photoURL: decodedToken.picture,
        authProvider: 'firebase',
        shadowAccount: false
      });

      // Create default profile for new user
      profile = await Onboarding.create({
        userId: user._id,
        userName: decodedToken.name || decodedToken.email,
        onboardingStatus: 'notStarted'
      });
    }

    const appToken = jwt.sign(
      { id: user._id, username: user.username },
      process.env.VITE_JWT_SECRET!,
      { expiresIn: "4d" }
    );

    res.json({ 
      status: "ok", 
      token: appToken, 
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL
      },
      profile
    });
  } catch (error) {
    console.error('Firebase token verification failed:', error);
    res.status(401).json({ error: "Invalid token" });
  }
};

const deleteUserAndProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;

    // Update profile to mark as deleted user
    await Onboarding.findOneAndUpdate(
      { userId },
      { 
        $set: { 
          userName: "Deleted User", 
        }
      }
    );

    // Delete the user account
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({ 
      message: 'Failed to delete account', 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

export { authenticateVerify, generateOptions, logoutUser, verifyFirebaseToken, deleteUserAndProfile };
