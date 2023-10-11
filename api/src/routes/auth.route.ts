import Routes from '../interfaces/routes.interface';
import AuthController from '../controllers/auth.controller';
import { Router } from 'express';

export default class AuthRoute implements Routes {
  public path = '/auth';
  public router = Router();
  private readonly authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, this.authController.login);
    this.router.post(`${this.path}/register`, this.authController.register);
    this.router.post(`${this.path}/logout`, this.authController.logout);

    this.router.post(`${this.path}/confirm-email`, this.authController.confirmCode);
    this.router.post(`${this.path}/resend-code`, this.authController.resendCode);
    this.router.post(`${this.path}/reset-password`, this.authController.resetPassword);
    this.router.post(`${this.path}/forgot-password`, this.authController.forgotPassword);
  }
}
