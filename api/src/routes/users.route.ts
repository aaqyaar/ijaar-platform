import Routes from '../interfaces/routes.interface';
import UsersController from '../controllers/users.controller';
import { Router } from 'express';

export default class UsersRoute implements Routes {
  public path = '/users';
  public router = Router();
  private readonly usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}`, this.usersController.getUsers);
  }
}
