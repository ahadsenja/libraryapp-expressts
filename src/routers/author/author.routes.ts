import authorController from "../../controllers/author/author.controller";
import { auth } from "../../middlewares/auth.middleware";
import BaseRoutes from "../base.routes";

class AuthorRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get('/', auth, authorController.findAll);
        this.router.get('/:id', auth, authorController.findOne);
        this.router.post('/', auth, authorController.create);
        this.router.put('/:id', auth, authorController.update);
        this.router.delete('/:id', auth, authorController.delete);
    }
}

export default new AuthorRoutes().router;