import ChargeController from "../../controllers/charge/charge.controller";
import { auth } from "../../middlewares/auth.middleware";
import BaseRoutes from "../base.routes";

class ChargeRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get('/', auth, ChargeController.findAll);
        this.router.get('/:id', auth, ChargeController.findOne);
        this.router.post('/', auth, ChargeController.create);
        this.router.put('/:id', auth, ChargeController.update);
        this.router.delete('/:id', auth, ChargeController.delete);
        this.router.get('/show-charges/:id', auth, ChargeController.showChargeByCustomerId);
    }
}

export default new ChargeRoutes().router;