/* eslint-disable prettier/prettier */

import { UserEntity } from 'src/auth/entities/user.entity';

export class NewReturned {
  partNumber: string;
  serialNumber: string;
  description: string;
  quantity: number;
  reason: string;
  takenAt: Date;
  requestedBy: UserEntity;
}
