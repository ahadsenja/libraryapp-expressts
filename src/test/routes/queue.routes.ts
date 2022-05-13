import QueueController from "../controller/queue.controller";
import BaseRoutes from "../../routers/base.routes";
import { auth } from "../../middlewares/auth.middleware";

class QueueRoutes extends BaseRoutes {
  public routes(): void {
    this.router.get('/', auth, QueueController.sendJob);
  }
}

export default new QueueRoutes().router;