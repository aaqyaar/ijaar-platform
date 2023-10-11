import express, { Express } from 'express';
import 'dotenv/config';
import connectDB from './database/connection';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import hpp from 'hpp';
import path from 'path';
import Routes from './interfaces/routes.interface';

connectDB();

export default class App {
  public app: Express;
  public port: number;

  constructor({ port, routes }: { port: number; routes: Routes[] }) {
    this.app = express();
    this.port = port;
    this.commonMiddlewares();
    this.initializeRoutes(routes);
    this.template();
  }

  private commonMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    if (process.env.NODE_ENV === 'development') {
      this.app.use(morgan('dev'));
    }
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(cookieParser());
    this.app.use(hpp());
  }
  private initializeRoutes(routes: Routes[]) {
    routes.forEach(route => {
      this.app.use('/api', route.router);
    });
  }

  private template() {
    this.app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });
  }

  public listen() {
    this.app.listen(this.port, () => {
      console.log(`🌏 App listening on the http://localhost:${this.port}`);
    });
  }
}
