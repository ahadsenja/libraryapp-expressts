import CategoryController from "../../controllers/category/category.controller";
import { auth } from "../../middlewares/auth.middleware";
import BaseRoutes from "../base.routes";

class CategoryRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get('/', auth, CategoryController.findAll);
        this.router.get('/:id', auth, CategoryController.findOne);
        this.router.post('/', auth, CategoryController.create);
        this.router.put('/:id', auth, CategoryController.update);
        this.router.delete('/:id', auth, CategoryController.delete);
        this.router.get('/name/:name?', CategoryController.search);
    }
}

export default new CategoryRoutes().router;