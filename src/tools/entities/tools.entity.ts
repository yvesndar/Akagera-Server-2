/* eslint-disable prettier/prettier */
import { UserEntity } from 'src/auth/entities/user.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Entity,
} from 'typeorm';

@Entity('tools')
export class ToolsEntity {
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
  receivedAt: Date;
  @ManyToOne(() => UserEntity, (userEntity) => userEntity.toolItem)
  @JoinColumn()
  receivedBy: UserEntity;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.updated)
  @JoinColumn()
  updatedBy: UserEntity;
  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;
}
