/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/entities/user.entity';

export class NewDemand {
  partNumber: string;
  serialNumber: string;
  description: string;
  quantity: number;
  demandedBy: UserEntity;
}
