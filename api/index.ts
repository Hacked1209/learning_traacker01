import { app } from "../server/app";
import { attachRoutes } from "../server/routes";

// Ensure routes are only attached once in the serverless environment
let initialized = false;

if (!initialized) {
  attachRoutes(app);
  initialized = true;
}

export default app;
