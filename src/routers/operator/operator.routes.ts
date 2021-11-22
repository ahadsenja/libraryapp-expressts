import BaseRoutes from '../base.routes';

import OperatorController from '../../controllers/operator.controller';
import { auth } from '../../middleware/auth.middleware';

class OperatorRoutes extends BaseRoutes {

    public routes(): void {
        this.router.get('/', auth, OperatorController.findAll);
        this.router.get('/:id', auth, OperatorController.findOne);
        this.router.post('/', auth, OperatorController.create);
        this.router.put('/:id', auth, OperatorController.update);
        this.router.delete('/:id', auth, OperatorController.delete);
    }
}

export default new OperatorRoutes().router;