import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import svgr from "vite-plugin-svgr";
import "dotenv/config";
import { sentryVitePlugin } from "@sentry/vite-plugin";


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
    build: {
      sourcemap: true,
    },
    base: BASE_URL,
    define: {
      API_URL: JSON.stringify(API_URL),
      'import.meta.env.VITE_FIREBASE_WEB_API_KEY': JSON.stringify(process.env.VITE_FIREBASE_WEB_API_KEY),
      'import.meta.env.VITE_FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.VITE_FIREBASE_AUTH_DOMAIN),
      'import.meta.env.VITE_FIREBASE_PROJECT_ID': JSON.stringify(process.env.VITE_FIREBASE_PROJECT_ID),
      'import.meta.env.VITE_FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.VITE_FIREBASE_STORAGE_BUCKET),
      'import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
      'import.meta.env.VITE_FIREBASE_APP_ID': JSON.stringify(process.env.VITE_FIREBASE_APP_ID),
      'import.meta.env.VITE_FIREBASE_MEASUREMENT_ID': JSON.stringify(process.env.VITE_FIREBASE_MEASUREMENT_ID),
      'import.meta.env.VITE_FFAPI_BASE_URL': JSON.stringify(process.env.VITE_FFAPI_BASE_URL),
      'import.meta.env.VITE_SENTRY_DSN': JSON.stringify(process.env.VITE_SENTRY_DSN),
      'import.meta.env.VITE_SENTRY_AUTH_TOKEN': JSON.stringify(process.env.VITE_SENTRY_AUTH_TOKEN),
    },
    server: {
      port: PORT,
    },
    preview: {
      port: PORT,
    },
    plugins: [
      tsconfigPaths(), 
      react(), 
      svgr(),
      sentryVitePlugin({
        // authToken: process.env.SENTRY_AUTH_TOKEN,
        authToken: "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",
        org: "vuo-ai",
        project: "javascript-react",
      }),
    ],
  });
};
