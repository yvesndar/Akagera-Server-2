/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/entities/user.entity';

export class NewRequest {
  partNumber: string;
  description: string;
  new: number;
  used: number;
  requestedBy: UserEntity;
}
