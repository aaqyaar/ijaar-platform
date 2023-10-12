import Routes from '../interfaces/routes.interface';
import UsersController from '../controllers/users.controller';
import { Router } from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import UserModel from '../models/users.model';

export default class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  private readonly usersController = new UsersController(UserModel);
  private readonly authMiddleware = new AuthMiddleware();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
  }
}
