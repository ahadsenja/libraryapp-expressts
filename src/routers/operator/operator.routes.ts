import BaseRoutes from '../base.routes';
import OperatorController from '../../controllers/operator.controller';

class OperatorRoutes extends BaseRoutes {

    public routes(): void {
        this.router.get('/', OperatorController.getAll);
    }
}

export default new OperatorRoutes().router;