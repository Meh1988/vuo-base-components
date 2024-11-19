// @ts-ignore
import express from "express";
import multer from "multer";

import {
  authenticateVerify,
  generateOptions,
  logoutUser,
} from "../controllers/authenticationController";
import {
  registerGenerateOptions,
  registerGenerateOptionsForShadowAccount,
  registerVerify,
  registerCreateShadowAccount,
  registerVerifyShadowAccount,
} from "../controllers/registrationController";
import { getQuest, getQuests } from "../controllers/questsController";
import {
  createPlayerQuest,
  updatePlayerQuestProgress,
  getCurrentPlayerQuests,
  getPlayerQuest,
  claimStep,
} from "../controllers/playerQuestsController";
import {
  getCurrentUserAchievement,
  getCurrentUserAchievements,
  updatePlayerAchievementProgress,
} from "../controllers/playerAchievementsController";
import { getAchievements } from "../controllers/AchievementsController";
import authMiddleware from "../middleware/authMiddleware";
import errorHandler from "../middleware/errorHandler";
import {
  getCurrentPlayerProfile,
  updateCurrentPlayerProfile,
} from "../controllers/playerProfileController";
import { getQuestLinesForLandingPage } from "../controllers/landingPageQuestLinesController";
import { getSneakPeekQuests } from "../controllers/sneakPeekQuestsController";
import {
  createGroupMembershipHandler,
  claimGroupMembershipHandler,
  getGroupMembers,
} from "../controllers/userGroupMembershipsController";

// admin controllers
import {
  uploadRecipes,
  getRecipe,
  indexRecipes,
  publishRecipe,
  updateRecipe,
  approveStepMedia,
  generateRecipe,
  getUniqueItems,
} from "../controllers/admin/recipesController";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware";
import { authenticateAdmin } from "../controllers/admin/authenticationController";
import { getSessionData } from "../controllers/multiplayerController";
import { getMealMapRecipes } from "../controllers/mealMapController";
import {
  createUserProfile,
  deleteUserProfile,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userProfileController";

import { getStepBreakdown } from "../controllers/stepBreakDownController";

import {
  createChallenge,
  generateChallenge,
  getChallengeById,
} from "../controllers/challengesController";

import {
  createProgressionPath,
  generateProgressionPath,
  getAllProgressionPaths,
  getProgressionPathById,
  updateProgressionPath,
} from "../controllers/progressionPathController";

import {
  createPlayerProgressionPath,
  getPlayerProgressionPathById,
  getPlayerProgressionPaths,
  updatePlayerProgressionPath,
} from "../controllers/playerProgressionPathController";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Registration routes
router.post("/register/generate-options", registerGenerateOptions);
router.post(
  "/register/generate-shadow-account-options",
  registerGenerateOptionsForShadowAccount
);
router.post("/register/verify", registerVerify);
router.post("/register/create-shadow-account", registerCreateShadowAccount);
router.post("/register/verify-shadow-account", registerVerifyShadowAccount);

// Authentication routes
router.get("/authenticate/generate-options", generateOptions);
router.post("/authenticate/verify", authenticateVerify);
router.post("/logout", authMiddleware, logoutUser);

// Landing page quests routes
router.get("/landing-page-questlines/:url", getQuestLinesForLandingPage);
router.get("/sneakPeekQuests/:url", getSneakPeekQuests);

// Quests routes
router.get("/quests", getQuests);
router.get("/quests/:id", authMiddleware, getQuest);
// router.get("/quests/:id", getQuest)

// Player routes
router.get("/playerQuests/me", authMiddleware, getCurrentPlayerQuests);
router.get("/playerQuests/:id", authMiddleware, getPlayerQuest);
router.post("/playerQuests", authMiddleware, createPlayerQuest);
router.patch("/playerQuests/:id", authMiddleware, updatePlayerQuestProgress);
router.patch("/playerQuests/:id/:stepId/claim", authMiddleware, claimStep);

// Achievement routes
router.get("/achievements", authMiddleware, getAchievements);

// Player achievement routes
router.get(
  "/playerAchievements/me",
  authMiddleware,
  getCurrentUserAchievements
);
router.get(
  "/playerAchievements/:id",
  authMiddleware,
  getCurrentUserAchievement
);
router.patch(
  "/playerAchievements/:id",
  authMiddleware,
  updatePlayerAchievementProgress
);

// Player profile routes
router.get("/players/me/profile", authMiddleware, getCurrentPlayerProfile);
router.patch("/players/me/profile", authMiddleware, updateCurrentPlayerProfile);

// Multiplayer routes
router.get("/multiplayer/session/:id", getSessionData);

// Routes to group membership
router.get("/memberships", authMiddleware, getGroupMembers);
router.post("/memberships", authMiddleware, createGroupMembershipHandler);
router.patch(
  "/memberships/:membershipId/claim",
  authMiddleware,
  claimGroupMembershipHandler
);

// admin routes
router.post("/admin/authenticate", authenticateAdmin);
router.get("/admin/recipes", adminAuthMiddleware, indexRecipes);
router.get(
  "/admin/recipes/available_filters/",
  adminAuthMiddleware,
  getUniqueItems
);
router.get("/admin/recipes/:id", adminAuthMiddleware, getRecipe);
router.patch("/admin/recipes/:id", adminAuthMiddleware, updateRecipe);
router.post(
  "/admin/recipes/upload/",
  adminAuthMiddleware,
  upload.single("file"),
  uploadRecipes
);
router.patch(
  "/admin/recipes/:id/approve-step-media",
  adminAuthMiddleware,
  approveStepMedia
);
router.patch(
  "/admin/recipes/:id/generate",
  adminAuthMiddleware,
  generateRecipe
);
router.patch("/admin/recipes/:id/publish", adminAuthMiddleware, publishRecipe);

// mealmap routes
router.get("/mealmap/recipes", getMealMapRecipes);

//user profile router

router.get("/profile/:id", getUserProfile);
router.post("/profile/create", createUserProfile);
router.patch("/profile/update", updateUserProfile);
router.delete("/profile/delete", deleteUserProfile);

//PrepPal routes
router.post("/prepPal/stepBreakdown", errorHandler, getStepBreakdown);

//Challenge routes
router.post("/challenges/create", errorHandler, createChallenge);
router.get("/challenges/challenge/:id", errorHandler, getChallengeById);
router.post("/challenges/generate", errorHandler, generateChallenge);

//Progression Path routes
router.post("/progressionPaths/create", errorHandler, createProgressionPath);
router.post(
  "/progressionPaths/generate",
  errorHandler,
  generateProgressionPath
);
router.get("/progressionPaths", errorHandler, getAllProgressionPaths);
router.get(
  "/progressionPaths/progressionPath/:id",
  errorHandler,
  getProgressionPathById
);
router.patch(
  "/progressionPaths/progressionPath/:id",
  errorHandler,
  updateProgressionPath
);

//Player Progression Path routes
router.post(
  "/playerProgressionPaths/create",
  errorHandler,
  createPlayerProgressionPath
);
router.get(
  "/playerProgressionPaths/byUser/:userId",
  errorHandler,
  getPlayerProgressionPaths
);
router.get(
  "/playerProgressionPaths/playerProgressionPath/:id",
  getPlayerProgressionPathById
);
router.patch(
  "/playerProgressionPaths/playerProgressionPath/:id",
  errorHandler,
  updatePlayerProgressionPath
);

export default router;
