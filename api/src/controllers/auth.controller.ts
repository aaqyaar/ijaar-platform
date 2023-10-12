import UserModel, { UserDocument } from '../models/users.model';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { User } from '../interfaces/user.interface';
import { TokenData } from './../interfaces/auth.interface';
import emailRepository from '../documents/emailRepository';
import { getEnv } from '../utils/helpers';

const createToken = (user: User): TokenData => {
  const expiresIn: number = 60 * 60;
  const token = sign({ _id: user._id }, getEnv('SECRET_KEY'), { expiresIn: expiresIn });
  return { expiresIn, token };
};

const generateDigits = () => {
  return (Math.floor(Math.random() * 900000) + 100000).toString();
};
export default class AuthController {
  constructor(private readonly schema: UserDocument) {
    schema = new UserModel();
  }

  // confirm code
  public async confirmCode(req: Request, res: Response) {
    try {
      const { code: confirmationCode, email } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      const isExpired = (user.confirmEmailExpire as any) < Date.now();
      if (isExpired) return res.status(400).json({ message: 'Token is expired & please generate new one' });
      if (user.confirmationCode !== confirmationCode) return res.status(400).json({ message: 'Invalid code' });
      user.isVerified = true;
      user.confirmationCode = undefined;
      user.confirmEmailExpire = undefined;
      user.confirmEmailToken = undefined;
      await user.save();
      return res.status(200).json({ message: 'Code confirmed successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  // resend code
  public async resendCode(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (user.isVerified) return res.status(400).json({ message: 'User is already verified' });
      // generate token and save it to database
      user.confirmationCode = generateDigits();
      user.getConfirmEmailToken();
      // send confirmation code to user email again
      await emailRepository.sendConfirmEmail(user.email, user.confirmationCode);
      await user.save();
      return res.status(200).json({ message: 'Code sent successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  public async login(req: Request, res: Response) {
    try {
      const { email, password: payloadPassword } = req.body;
      //   check if user exists
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      //   check if password is correct
      const isMatch = await user.comparePassword(payloadPassword);

      if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
      //   create token
      const tokenData = createToken(user);
      //   create cookie
      res.cookie('token', tokenData.token, { httpOnly: true, maxAge: tokenData.expiresIn });
      //   send response
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user.toObject();
      return res.status(200).json({
        message: 'Login successful',
        user: rest,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async register(req: Request, res: Response) {
    try {
      const user = req.body;
      //   check if user exists
      const userExists = await UserModel.findOne({ email: user.email });
      if (userExists) return res.status(400).json({ message: 'User already exists' });
      //   create user
      const createdUser = await UserModel.create(user);
      createdUser.confirmationCode = generateDigits();
      // generate token and save it to database
      createdUser.getConfirmEmailToken();
      // send confirmation code to createdUser email
      await emailRepository.sendConfirmEmail(createdUser.email, createdUser.confirmationCode);
      await createdUser.save();
      res.status(201).json({ message: 'User created successfully', verify: 'Please verify your email address to continue' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  // reset password
  public async resetPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) return res.status(404).json({ message: 'User not found' });
      if (!user.isVerified) return res.status(400).json({ message: 'User is not verified' });
      const resetToken = await user.getResetPasswordToken();
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpire = (Date.now() + 10 * 60 * 1000) as any;
      await user.save();
      const uri = `${getEnv('CLIENT_URL')}/auth/reset-password/${resetToken}`;
      await emailRepository.sendResetPasswordEmail(user.email, uri);
      return res.status(200).json({ message: 'Reset password link sent successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async forgotPassword(req: Request, res: Response) {
    try {
      const { password, resetToken } = req.body;
      const user = await UserModel.findOne({
        resetPasswordToken: resetToken,
        resetPasswordExpire: { $gt: Date.now() },
      });
      if (!user) return res.status(400).json({ message: 'Token is invalid or expired' });

      await user.changePassword(password);
      return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async logout(req: Request, res: Response) {
    try {
      res.clearCookie('Authorization');
      return res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
