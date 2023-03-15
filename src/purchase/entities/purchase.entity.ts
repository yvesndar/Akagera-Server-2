/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Status } from './status.enum';

@Entity('purchases')
export class PurchaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  partNumber: string;
  @Column({ nullable: false })
  serialNumber: string;
  @Column({ nullable: false })
  description: string;
  @Column({ nullable: false })
  purchaseOrderNumber: string;
  @Column({ nullable: false })
  quantity: number;
  @Column({ nullable: true })
  shelflife: Date;
  @Column({ nullable: false })
  category: string;

  @Column({ nullable: true })
  vendorName: string;
  @Column({ nullable: true })
  vendorAddress: string;

  @Column({ nullable: true })
  pricePerUnit: number;
  @Column({ nullable: false })
  exchange: number;

  @Column({ nullable: false })
  total: number;
  @Column({ nullable: true })
  packing: string;
  @CreateDateColumn({ nullable: true })
  deliveredOn: Date;
  @CreateDateColumn({ nullable: true })
  purchasedOn: Date;
  @CreateDateColumn({ nullable: true })
  DeliveredAt: Date;
  @Column({ nullable: false })
  invoiceNumber: string;
  @Column({ nullable: false })
  currency: string;
  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.receiver)
  @JoinColumn()
  receivedBy: UserEntity;
}
