/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/entities/user.entity';
import { Status } from '../entities/status.enum';

export class UpdateRequest {
  id: number;
  partNumber: string;
  description: string;
  pickupDate: Date;
  new: number;
  used: number;
  updatedAt: Date;
  requestedBy: UserEntity;
  updatedBy: UserEntity;
  status: Status;
}
