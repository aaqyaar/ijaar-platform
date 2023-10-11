import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { User } from '../interfaces/user.interface';
import crypto from 'crypto';

interface IUser extends User {
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  confirmEmailToken?: string;
  confirmEmailExpire?: Date;
  confirmationCode?: string;
  comparePassword: (password: string) => Promise<boolean>;
  changePassword: (password: string) => Promise<void>;
  encryptPassword: (password: string) => Promise<string>;

  getResetPasswordToken: () => string;
  getConfirmEmailToken: () => string;
}

type UserDocument = IUser & Document;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photoURL: { type: String, default: null },
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    phoneNumber: { type: String, required: true },
    role: { type: Schema.Types.ObjectId, ref: 'Role' },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    confirmEmailToken: String,
    confirmEmailExpire: Date,
    confirmationCode: String,
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(this.password, salt);
  this.password = hash;
  next();
});

UserSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.encryptPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};
// change to this password

UserSchema.methods.changePassword = async function (password: string) {
  this.password = await this.encryptPassword(password);
  this.resetPasswordToken = undefined;
  this.resetPasswordExpire = undefined;

  await this.save();
};

UserSchema.methods.getResetPasswordToken = function (): string {
  const resetToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  // expires 10 minutes
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  return resetToken;
};

UserSchema.methods.getConfirmEmailToken = function (): string {
  const confirmEmailToken = crypto.randomBytes(20).toString('hex');
  this.confirmEmailToken = crypto.createHash('sha256').update(confirmEmailToken).digest('hex');
  // expires 10 minutes
  this.confirmEmailExpire = Date.now() + 10 * 60 * 1000;
  return confirmEmailToken;
};

export default model<UserDocument>('User', UserSchema);
