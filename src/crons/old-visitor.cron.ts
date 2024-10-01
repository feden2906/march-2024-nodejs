import { CronJob } from "cron";

import { EmailTypeEnum } from "../enums/email-type.enum";
import { timeHelper } from "../helpers/time.helper";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "../services/email.service";

const handler = async () => {
  try {
    const date = timeHelper.subtractByParams(7, "day");

    const users = await userRepository.findWithOutActivity(date);
    await Promise.all(
      users.map(async (user) => {
        await emailService.sendMail(EmailTypeEnum.OLD_VISIT, user.email, {
          name: user.name,
        });
      }),
    );
    console.log(`Sent ${users.length} old visit emails`);
  } catch (error) {
    console.error(error);
  }
};

export const oldVisitorCronJob = new CronJob("*/5 * * * 8 *", handler);
