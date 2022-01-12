import { MainServer } from "./MainServer";
import { logger } from "./utils/logger";

export const main = async (): Promise<void> => {
  await MainServer.init();
  MainServer.start();
};

main().catch(async (err) => {
  logger.error(err);
  await MainServer.shutdown();
  process.exit(1);
});

// Handle Ctrl + C or close event
process.on("SIGINT", async () => {
  await MainServer.shutdown();
  process.exit();
});

// Handle Process terminate event.
process.on("SIGTERM", async () => {
  await MainServer.shutdown();
  process.exit();
});
