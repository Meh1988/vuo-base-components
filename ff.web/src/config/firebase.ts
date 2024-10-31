import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDEY5Y4PAOGCaT_MxtCUWjf-ueT0Qq4Yxs",    // Your Web API Key
  authDomain: "fixfoodauth.firebaseapp.com",             // Project ID + ".firebaseapp.com"
  projectId: "fixfoodauth",                              // Your Project ID
  storageBucket: "fixfoodauth.appspot.com",             // Project ID + ".appspot.com"
  messagingSenderId: "670789600397",                     // Your Project number
  appId: "1:670789600397:web:XXXXX"    
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 