import express, { Application, Request, Response } from 'express';

import OperatorRoutes from './routers/operator/operator.routes';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.routes();
    }

    routes(): void {
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