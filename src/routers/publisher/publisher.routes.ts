import PublisherController from "../../controllers/publisher/publisher.controller";
import { auth } from "../../middlewares/auth.middleware";
import BaseRoutes from "../base.routes";

class PublisherRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get('/', auth, PublisherController.findAll);
        this.router.get('/:id', auth, PublisherController.findOne);
        this.router.post('/', auth, PublisherController.create);
        this.router.put('/:id', auth, PublisherController.update);
        this.router.delete('/:id', auth, PublisherController.delete);
    }
}

export default new PublisherRoutes().router;