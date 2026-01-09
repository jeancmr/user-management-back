import { UserPlan } from '../enums/user-plan.enum';
import { UserRole } from '../enums/user-role.enum';
import { UserStatus } from '../enums/user-status.enum';

export class User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  plan: UserPlan;
  lastLogin: Date;
  createdAt: Date;
  updatedAt: Date;
}
