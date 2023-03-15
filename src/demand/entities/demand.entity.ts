/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';
import { Status } from './status.enum';

@Entity('demands')
export class DemandEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partNumber: string;
  @Column()
  serialNumber: string;
  @Column()
  description: string;
  @Column({ nullable: true })
  quantity: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  requestedAt: Date;
  @Column({ nullable: false, type: 'timestamp' })
  returnedAt: Date;
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.demandedItem)
  @JoinColumn()
  demandedBy: UserEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.updated)
  @JoinColumn()
  updatedBy: UserEntity;
  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;
}
