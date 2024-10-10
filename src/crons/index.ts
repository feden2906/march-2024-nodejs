import { oldVisitorCronJob } from "./old-visitor.cron";
import { removeOldPasswordsCronJob } from "./remove-old-passwords.cron";
import { removeOldTokensCronJob } from "./remove-old-tokens.cron";
import { testCronJob } from "./test.cron";

export const cronRunner = () => {
  testCronJob.start();
  removeOldTokensCronJob.start();
  removeOldPasswordsCronJob.start();
  oldVisitorCronJob.start();
};
