/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/entities/user.entity';
import { Status } from '../entities/status.enum';

export class UpdateDemand {
  id: number;
  partNumber: string;
  serialNumber: string;
  description: string;
  quantity: number;
  returnedAt: Date;
  updatedAt: Date;
  demandedBy: UserEntity;
  updatedBy: UserEntity;
  status: Status;
}
