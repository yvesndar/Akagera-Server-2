/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from './status.enum';

@Entity('returned')
export class ReturnedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  partNumber: string;
  @Column({ nullable: false })
  serialNumber: string;
  @Column({ nullable: false, type: 'longtext' })
  reason: string;
  @Column({ nullable: false })
  quantity: number;
  @Column({ nullable: false, type: 'timestamp' })
  takenAt: Date;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  returnedAt: Date;
  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.requester)
  @JoinColumn()
  requestedBy: UserEntity;
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.receiver)
  @JoinColumn()
  receivedBy: UserEntity;
}
