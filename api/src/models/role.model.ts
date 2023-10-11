import { Schema, model, models } from 'mongoose';

interface Permission {
  subject: string;
  action: string;
  role: string;
  reason: string;
}

interface Role {
  name: 'user' | 'client' | 'agent' | 'superadmin';
  permissions: Permission[];
}

const RoleSchema = new Schema(
  {
    name: { type: String, required: true, enum: ['user', 'client', 'agent', 'superadmin'] },
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Permission',
      },
    ],
  },
  { timestamps: true },
);

const PermissionSchema = new Schema({
  subject: { type: String, required: true },
  action: { type: String, required: true },
  role: { type: Schema.Types.ObjectId, ref: 'Role' },
  reason: { type: String, required: true },
});

export const Permission = models.Permission || model('Permission', PermissionSchema);

export const Role = models.Role || model<Role>('Role', RoleSchema);
