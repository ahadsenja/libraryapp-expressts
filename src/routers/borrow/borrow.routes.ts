import BorrowController from "../../controllers/borrow/borrow.controller";
import { auth } from "../../middlewares/auth.middleware";
import BaseRoutes from "../base.routes";

class BorrowRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get('/', auth, BorrowController.findAll);
        this.router.get('/:id', auth, BorrowController.findOne);
        this.router.post('/', auth, BorrowController.create);
        this.router.put('/:id', auth, BorrowController.update);
        this.router.delete('/:id', auth, BorrowController.delete);
    }
}

export default new BorrowRoutes().router;