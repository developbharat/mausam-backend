import schedule from "node-schedule";
import { awsImd } from "../../modules/scrape";
import { logger } from "../../utils/logger";

const { scrape_aws_imd_all_states } = awsImd;

// Execute when the minute is 35, - 10:35, 11:35 etc.
schedule.scheduleJob("35 * * * *", async (date) => {
  try {
    logger.info(`Scrapping all states from IMD at: ${date.toISOString()}`);
    await scrape_aws_imd_all_states();
    logger.info(`Scrapped all states from IMD at: ${date.toISOString()}`);
  } catch (err) {
    logger.error(`Scrape at: ${date.toISOString()} failed with error: ${err.message}`);
  }
});

// Rescrape data for yesterday, to make sure we are not missing any entry.
// Execute when the minute is 50, - 10:50, 11:50 etc.
schedule.scheduleJob("50 * * * *", async (date) => {
  try {
    const today = new Date();
    const yesterday = new Date(new Date().setDate(today.getDate() - 1));

    logger.info(`ReScrapping all states from IMD for last 1 day at: ${date.toISOString()}`);

    await scrape_aws_imd_all_states({ start_date: yesterday, end_date: today });
    logger.info(`ReScrapped all states from IMD for last 1 day at: ${date.toISOString()}`);
  } catch (err) {
    logger.error(`ReScrape at: ${date.toISOString()} failed with error: ${err.message}`);
  }
});
