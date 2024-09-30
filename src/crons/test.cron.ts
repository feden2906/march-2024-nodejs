import { CronJob } from "cron";

const handler = async () => {
  console.log("TestCron is running");
};

export const testCronJob = new CronJob("* 1 * * * *", handler);
