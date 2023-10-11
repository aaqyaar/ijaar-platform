import UserModel from '../models/users.model';
import { Request, Response } from 'express';

export default class UsersController {
  public async getUsers(req: Request, res: Response) {
    try {
      const users = await UserModel.find();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
