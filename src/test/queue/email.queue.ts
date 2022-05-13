import Bull from 'bull';
import dotenv from 'dotenv';

dotenv.config();

class EmailQueue {
  queue = new Bull('Testing queue', {
    redis: {
      host: process.env.REDIS_HOST,
      port: 6379
    }
  });

  addJob = (job: any) => {
    this.queue.add(() => {
      repeat: {
        cron: '* * * * * *'
      }
    })
  }

  processQueue = (job: any) => {
    this.queue.process(() => {
      console.log('this is job data');
    })
  }
}

export default new EmailQueue();