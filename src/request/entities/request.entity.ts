import { UserEntity } from 'src/auth/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Status } from './status.enum';

@Entity('request')
export class RequestEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  partNumber: string;
  @Column()
  description: string;
  @Column({ nullable: true })
  pickupDate: Date;
  @Column({ nullable: true })
  category: Date;
  @Column({ nullable: true })
  new: number;
  @Column({ nullable: true })
  used: number;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  requestedAt: Date;
  @Column({ nullable: true })
  updatedAt: Date;
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.requestedItem)
  @JoinColumn()
  requestedBy: UserEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.updated)
  @JoinColumn()
  updatedBy: UserEntity;
  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;
}
