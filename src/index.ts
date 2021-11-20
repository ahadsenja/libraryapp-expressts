import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';

import OperatorRoutes from './routers/operator/operator.routes';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
    }

    protected plugins(): void {
        this.app.use(morgan('dev'));
    }

    protected routes(): void {
        this.app.route('/').get((req: Request, res: Response) => {
            res.send('This is test from library app');
        });

        this.app.use('/api/v1/operators', OperatorRoutes);
    }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
    console.log('This app is running on port ' + `${port}`);
});