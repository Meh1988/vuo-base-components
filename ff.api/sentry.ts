import * as Sentry from "@sentry/node";


Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  // Adjust this value based on your needs
  tracesSampleRate: 1.0,
  // Optional: Add any custom configurations here
  beforeSend(event) {
    // Optional: Modify or filter events before sending to Sentry
    return event;
  },
});
