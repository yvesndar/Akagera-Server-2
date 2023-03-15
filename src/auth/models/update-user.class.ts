/* eslint-disable prettier/prettier */
import { Roles } from '../entities/roles.enum';
import { Status } from '../entities/status.enum';

export class UpdateUser {
  id: number;
  firstname: string;
  lastname: string;
  role: Roles;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirm: string;
  status: Status;
}
