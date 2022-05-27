import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import moment from 'moment';
import dotenv from 'dotenv';

const db = require('../db/models');

dotenv.config();

class MailJob {
  senderMailConfig: object = {};
  mailOptions: object = {};

  email: string = '';
  customerName: string = '';

  charge: number = 0;
  overdue: number = 0;

  now = new Date();
  today = new Date(this.now);

  chargeCount = async () => {
    this.today.setDate(this.today.getDate());
    const thisDay = moment.utc(this.today).format('YYYY-MM-DD');

    const borrows = await db.borrow.findAll({
      where: { return_date: thisDay },
      include: ['book', 'customer']
    });

    if (borrows) {
      for (let b of borrows) {
        const rDate = new Date(b.return_date);

        if (this.today > rDate) {
          // this.charge += 2000;
          // this.overdue += 1;

          // const updateCharge = await db.borrow.update({
          //   charge: this.charge,
          //   overdue: this.overdue
          // }, {
          //   where: { return_date: rDate }
          // });

          console.log('updated charge: ', rDate);
        }
      }
    }
  }

  sendReminderMail = async () => {
    this.today.setDate(this.today.getDate() + 1);
    const tomorrow = moment.utc(this.today).format('YYYY-MM-DD');

    const borrows = await db.borrow.findAll({
      where: { return_date: tomorrow },
      include: ['book', 'customer']
    });

    for (let i = 0; i < borrows.length; i++) {
      this.email = borrows[i].customer.email;
      this.customerName = borrows[i].customer.name;
    }

    this.senderMailConfig = {
      service: 'gmail',
      auth: {
        user: process.env.FROM_EMAIL,
        pass: process.env.PASS
      }
    }

    this.mailOptions = {
      from: process.env.FROM_EMAIL,
      to: this.email,
      subject: 'Borrowing Due Date Information',
      html: `Hai ${this.customerName}, This is your borrowing info. 
      ${'\n'} Tomorrow will be the last day. 
      ${'\n'} Please do the extension immediately`
    }

    const transporter = nodemailer.createTransport(this.senderMailConfig);

    transporter.sendMail(this.mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log('Mail Info', info.response);
      }
    })
  }
}

export default new MailJob();