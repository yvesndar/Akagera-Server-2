/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/entities/user.entity';

export class NewParts {
  partNumber: string;
  serialNumber: string;
  description: string;
  new: number;
  receivedBy: UserEntity;
}
