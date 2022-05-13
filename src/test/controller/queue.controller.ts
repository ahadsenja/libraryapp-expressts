import { Request, Response } from 'express';
import cron from 'node-cron';
import nodemailer from 'nodemailer';
import moment from 'moment';
import dotenv from 'dotenv';
import borrowRoutes from '../../routers/borrow/borrow.routes';

const db = require('../../db/models');

dotenv.config();

class QueueController {
  sendJob = async (req: Request, res: Response) => {
    const senderMailConfig = {
      service: 'gmail',
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.PASS
      }
    }

    const mailOptions = {
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      subject: 'Email Info Scheduler',
      html: `Hai, This is your borrow info, please do the extension immediately`
    }

    const transporter = nodemailer.createTransport(senderMailConfig);

    cron.schedule('* * * * * *', async () => {
      const now = new Date();
      const today = new Date(now);
      today.setDate(today.getDate() + 1);

      const tomorrow = moment.utc(today).format('YYYY-MM-DD');

      const borrows = await db.borrow.findAll({
        where: { return_date: tomorrow }
      });

      if (borrows) {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log('Mail sent: ', info.response);
          }
        })
      }

      res.send({
        data: borrows
      });
    })
  }

}

export default new QueueController();