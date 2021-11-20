import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';

import OperatorRoutes from './routers/operator/operator.routes';

class App {
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json()); // check response body from client
        this.app.use(morgan('dev')); // endpoint logger
        this.app.use(compression()); // reduce size of response
        this.app.use(helmet()); // protect header from the client and server side
        this.app.use(cors()); // allowing frontend to access the endpoint
    }

    protected routes(): void {
        this.app.use('/api/v1/auth');
        this.app.use('/api/v1/operator', OperatorRoutes);
        this.app.use('/api/v1/customer');
        this.app.use('/api/v1/book');
        this.app.use('/api/v1/author');
        this.app.use('/api/v1/genre');
        this.app.use('/api/v1/category');
        this.app.use('/api/v1/publisher');

    }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
    console.log('This app is running on port ' + `${port}`);
});