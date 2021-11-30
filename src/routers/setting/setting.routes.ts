import SettingController from "../../controllers/setting/setting.controller";
import { auth } from "../../middlewares/auth.middleware";
import BaseRoutes from "../base.routes";

class SettingRoutes extends BaseRoutes {
    public routes(): void {
        this.router.get('/', auth, SettingController.findAll);
        this.router.get('/:id', auth, SettingController.findOne);
        this.router.post('/', auth, SettingController.create);
        this.router.put('/:id', auth, SettingController.update);
        this.router.delete('/:id', auth, SettingController.delete);
    }
}

export default new SettingRoutes().router;