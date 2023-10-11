import { Schema, model, models } from 'mongoose';

interface Role {
  name: string;
  permissions: string[];
}

const RoleSchema = new Schema(
  {
    name: { type: String, required: true, enum: ['admin', 'user', 'teacher', 'partner'] },
    permissions: [String],
  },
  { timestamps: true },
);

export default models.Role || model<Role>('Role', RoleSchema);
