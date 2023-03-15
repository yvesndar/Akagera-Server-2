/* eslint-disable prettier/prettier */
import { Roles } from '../entities/roles.enum';

export class NewUser {
  firstname: string;
  lastname: string;
  role: Roles;
  username: string;
  email: string;
  password: string;
  confirm: string;
}
