// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node"

Sentry.init({
  dsn: "https://1076b587f6692982a56068bcb343a472@o4508835669475328.ingest.de.sentry.io/4509469227352144",
  integrations: [
    Sentry.mongooseIntegration()
  ],
  //tracesSampleRate: 1.0, // Adjust this value in production

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});
