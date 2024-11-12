import { auth } from '../config/firebase';
import { 
  GoogleAuthProvider, 
  signInWithPopup,
  FacebookAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  updateProfile
} from 'firebase/auth';

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    // Add these settings to the provider
    provider.setCustomParameters({
      prompt: 'select_account'
    });
    
    const result = await signInWithPopup(auth, provider)
      .catch((error) => {
        if (error.code === 'auth/popup-closed-by-user') {
          throw new Error('Sign-in cancelled by user');
        }
        throw error;
      });
      
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    throw error;
  }
};

//TODO enable facebook login, fix the conflict with google sign in
// export const signInWithFacebook = async () => {
//   try {
//     const provider = new FacebookAuthProvider();
//     const result = await signInWithPopup(auth, provider);
//     return result.user;
//   } catch (error) {
//     console.error('Error signing in with Facebook:', error);
//     throw error;
//   }
// };

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up with email:', error);
    throw error;
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Error signing in with email:', error);
    throw error;
  }
};

export const resetPassword = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
};

export const linkShadowAccountWithGoogle = async (shadowAccountId: string) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const idToken = await result.user.getIdToken();
    
    const response = await fetch('/v1/authenticate/verify-firebase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: idToken,
        shadowAccountId: shadowAccountId
      })
    });
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error linking account:', error);
    throw error;
  }
};

const linkAccount = async () => {
  try {
    const result = await linkShadowAccountWithGoogle(sessionDataStore.user.id);
    if (result.status === "ok") {
      sessionDataStore.token = result.token;
      sessionDataStore.user = result.user;
      sessionDataStore.shadowAccount = false;
    }
  } catch (error) {
    console.error('Failed to link account:', error);
  }
};