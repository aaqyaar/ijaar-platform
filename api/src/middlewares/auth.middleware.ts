import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { DataStoredInToken, RequestWithUser } from '../interfaces/auth.interface';
import User from '../models/users.model';
import { User as IUser } from '../interfaces/user.interface';
import { getEnv } from '../utils/helpers';

export class AuthMiddleware {
  public verifyToken(req: RequestWithUser, res: Response, next: NextFunction) {
    const withBearer = req.headers.authorization;
    // check the token if bearer is included or not
    if (!withBearer?.startsWith('Bearer ')) {
      return res.status(403).send({ message: 'No token provided!' });
    }
    // remove the bearer from the token
    const token = withBearer.split(' ')[1];
    // verify the token
    jwt.verify(token.toString(), getEnv('SECRET_KEY'), async (err: any, decoded: DataStoredInToken) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized!' });
      }
      const user = await User.findById(decoded._id);
      req.user = user as IUser;
      next();
    });
  }
}
