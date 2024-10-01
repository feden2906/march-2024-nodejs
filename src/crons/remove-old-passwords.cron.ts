import { CronJob } from "cron";

import { timeHelper } from "../helpers/time.helper";
import { oldPasswordRepository } from "../repositories/old-password.repository";

const handler = async () => {
  try {
    const date = timeHelper.subtractByParams(90, "day");

    const deletedCount = await oldPasswordRepository.deleteManyByParams({
      createdAt: { $lt: date },
    });
    console.log(`Deleted ${deletedCount} old passwords`);
  } catch (error) {
    console.error(error);
  }
};

export const removeOldPasswordsCronJob = new CronJob("*/5 * * * 8 *", handler);
