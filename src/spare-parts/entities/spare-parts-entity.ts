/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('parts')
export class PartsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  partNumber: string;
  @Column({ nullable: false })
  serialNumber: string;
  @Column({ nullable: false })
  description: string;
  @Column({ nullable: false })
  category: string;
  @Column({ nullable: false })
  new: number;
  @Column({ nullable: true })
  used: number;
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.partItem)
  @JoinColumn()
  receivedBy: UserEntity;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  receivedAt: Date;
  @Column({ nullable: true })
  updatedAt: Date;
}
