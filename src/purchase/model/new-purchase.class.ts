/* eslint-disable prettier/prettier */

import { UserEntity } from 'src/auth/entities/user.entity';

export class NewPurchase {
  partNumber: string;
  serialNumber: string;
  description: string;
  purchaseOrderNumber: string;
  quantity: number;
  pricePerUnit: number;
  total: number;
  receivedBy: UserEntity;
  invoiceNumber: string;
  currency: string;
  exchange: number;
  category: string;
}
