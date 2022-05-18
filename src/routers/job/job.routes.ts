import BaseRoutes from "../../routers/base.routes";
import CronJob from '../../config/cron.job';
import { auth } from "../../middlewares/auth.middleware";

class JobRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', auth, CronJob.jobs);
  }
}

export default new JobRoutes().router;