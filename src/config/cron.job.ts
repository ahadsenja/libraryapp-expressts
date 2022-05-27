import { Request, Response } from 'express';
import cron from 'node-cron';
import dotenv from 'dotenv';
import moment from 'moment';

import MailJob from './mail.job';

dotenv.config();

class CronJob {
  jobs = () => {
    cron.schedule('* * * * *', () => {
      // MailJob.sendReminderMail();
      MailJob.chargeCount();
    });
  }
}

export default new CronJob();