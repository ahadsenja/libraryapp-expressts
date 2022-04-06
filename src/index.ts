import express, { Application, NextFunction, Request, Response } from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import { config as dotenv } from 'dotenv';
import passport from 'passport';
import session from 'express-session';

import OperatorRoutes from './routers/operator/operator.routes';
import CustomerRoutes from './routers/customer/customer.routes';
import BookRoutes from './routers/book/book.routes';
import AuthorRoutes from './routers/author/author.routes';
import GenreRoutes from './routers/genre/genre.routes';
import CategoryRoutes from './routers/category/category.routes';
import PublisherRoutes from './routers/publisher/publisher.routes';
import SettingRoutes from './routers/setting/setting.routes';
import ChargeRoutes from './routers/charge/charge.routes';
import BookReturnRoutes from './routers/book_return/book_return.routes';
import BorrowRoutes from './routers/borrow/borrow.routes';
import AuthRoutes from './routers/auth/auth.routes';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv();
  }

  protected plugins(): void {
    this.app.use(bodyParser.json()); // check response body from client
    this.app.use(morgan('dev')); // endpoint logger
    this.app.use(compression()); // reduce size of response
    this.app.use(helmet()); // protect header from the client and server side
    this.app.use(cors()); // allowing frontend to access the endpoint
    this.app.use(session({
      secret: 'olibraryapp.com',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 24 * 60 * 60 * 1000
      }
    }));
    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  protected routes(): void {
    this.app.use('/api/v1/auth', AuthRoutes);
    this.app.use('/api/v1/operator', OperatorRoutes);
    this.app.use('/api/v1/customer', CustomerRoutes);
    this.app.use('/api/v1/book', BookRoutes);
    this.app.use('/api/v1/author', AuthorRoutes);
    this.app.use('/api/v1/genre', GenreRoutes);
    this.app.use('/api/v1/category', CategoryRoutes);
    this.app.use('/api/v1/publisher', PublisherRoutes);
    this.app.use('/api/v1/setting', SettingRoutes);
    this.app.use('/api/v1/charge', ChargeRoutes);
    this.app.use('/api/v1/bookreturn', BookReturnRoutes);
    this.app.use('/api/v1/borrow', BorrowRoutes);
  }
}

const port: number = 8000;
const app = new App().app;

app.listen(port, () => {
  console.log('This app is running on port ' + `${port}`);
});