import { auth } from "../../middlewares/auth.middleware";
import GenreController from "../../controllers/genre/genre.controller";
import BaseRoutes from "../base.routes";

class GenreRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get('/', auth, GenreController.findAll);
        this.router.get('/:id', auth, GenreController.findOne);
        this.router.post('/', auth, GenreController.create);
        this.router.put('/:id', auth, GenreController.update);
        this.router.delete('/:id', auth, GenreController.delete);
    }
}

export default new GenreRoutes().router;