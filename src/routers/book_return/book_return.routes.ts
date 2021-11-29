import BookReturnController from "../../controllers/book_return/book_return.controller";
import { auth } from "../../middleware/auth.middleware";
import BaseRoutes from "../base.routes";

class BookReturnRoutes extends BaseRoutes {
    routes(): void {
        this.router.get('/', auth, BookReturnController.findAll);
        this.router.get('/:id', auth, BookReturnController.findOne);
        this.router.post('/', auth, BookReturnController.create);
        this.router.put('/:id', auth, BookReturnController.update);
        this.router.delete('/:id', auth, BookReturnController.delete);
    }
}

export default new BookReturnRoutes().router;