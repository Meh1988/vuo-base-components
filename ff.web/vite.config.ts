import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import "dotenv/config";

const env = loadEnv("", process.cwd());

// Let's not import all the environment variables autimatically but bring them
// in by hand just to be sure we don't leak sensitive information by accident

// https://vitejs.dev/config/

// Docker-compose env vars takes privilege over .env files
// WHen running a single service from it's directory, the .env file is used
// When running all services, the .env file is used but overriden by the docker-compose env vars
// In production env vars have to be brouught in through the Dockerfile as ARGS

const PORT = parseInt(process.env.VITE_FFWEB_PORT as string) ?? 3000;
const BASE_URL = process.env.VITE_FFWEB_BASE_URL ?? "/";
const API_URL = process.env.VITE_FFAPI_BASE_URL ?? "http://localhost:8080";

export default () => {
  return defineConfig({
    base: BASE_URL,
    define: {
      API_URL: JSON.stringify(API_URL),
      // VITE_FIREBASE_WEB_API_KEY: JSON.stringify(process.env.VITE_FIREBASE_WEB_API_KEY),
      // VITE_FIREBASE_AUTH_DOMAIN: JSON.stringify(process.env.VITE_FIREBASE_AUTH_DOMAIN),
      // VITE_FIREBASE_PROJECT_ID: JSON.stringify(process.env.VITE_FIREBASE_PROJECT_ID),
      // VITE_FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.VITE_FIREBASE_STORAGE_BUCKET),
      // VITE_FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(process.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
      // VITE_FIREBASE_APP_ID: JSON.stringify(process.env.VITE_FIREBASE_APP_ID),
      // VITE_FIREBASE_MEASUREMENT_ID: JSON.stringify(process.env.VITE_FIREBASE_MEASUREMENT_ID),
      // VITE_FFAPI_BASE_URL: JSON.stringify(process.env.VITE_FFAPI_BASE_URL),

      VITE_FIREBASE_WEB_API_KEY: JSON.stringify(import.meta.env.VITE_FIREBASE_WEB_API_KEY),
      VITE_FIREBASE_AUTH_DOMAIN: JSON.stringify(import.meta.env.VITE_FIREBASE_AUTH_DOMAIN),
      VITE_FIREBASE_PROJECT_ID: JSON.stringify(import.meta.env.VITE_FIREBASE_PROJECT_ID),
      VITE_FIREBASE_STORAGE_BUCKET: JSON.stringify(import.meta.env.VITE_FIREBASE_STORAGE_BUCKET),
      VITE_FIREBASE_MESSAGING_SENDER_ID: JSON.stringify(import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
      VITE_FIREBASE_APP_ID: JSON.stringify(import.meta.env.VITE_FIREBASE_APP_ID),
      VITE_FIREBASE_MEASUREMENT_ID: JSON.stringify(import.meta.env.VITE_FIREBASE_MEASUREMENT_ID),
      VITE_FFAPI_BASE_URL: JSON.stringify(import.meta.env.VITE_FFAPI_BASE_URL),
    },
    server: {
      port: PORT,
    },
    preview: {
      port: PORT,
    },
    plugins: [tsconfigPaths(), react(), svgr()],
  });
};
