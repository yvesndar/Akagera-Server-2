/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/entities/user.entity';

export class NewTools {
  partNumber: string;
  serialNumber: string;
  description: string;
  quantity: number;
  receivedBy: UserEntity;
}
