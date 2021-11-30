import BookController from "../../controllers/book/book.controller";
import { auth } from "../../middlewares/auth.middleware";
import BaseRoutes from "../base.routes";

class BookRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get('/', auth, BookController.findAll);
        this.router.get('/:id', auth, BookController.findOne);
        this.router.post('/', auth, BookController.create);
        this.router.put('/:id', auth, BookController.update);
        this.router.delete('/:id', auth, BookController.delete);
    }
}

export default new BookRoutes().router;