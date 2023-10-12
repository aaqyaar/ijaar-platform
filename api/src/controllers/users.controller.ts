import UserModel from '../models/users.model';
import { Request, Response } from 'express';

export default class UsersController {
  constructor(private readonly schema: typeof UserModel) {
    schema = UserModel;
  }

  public getUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.schema.find();
      return res.status(200).json({ users });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
}
