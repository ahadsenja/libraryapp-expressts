import customerController from "../../controllers/customer/customer.controller";
import { auth } from "../../middleware/auth.middleware";
import BaseRoutes from "../base.routes";

class CustomerRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get('/', auth, customerController.findAll);
        this.router.get('/:id', auth, customerController.findOne);
        this.router.post('/', auth, customerController.create);
        this.router.put('/:id', auth, customerController.update);
        this.router.delete('/:id', auth, customerController.delete);
    }
}

export default new CustomerRoutes().router;