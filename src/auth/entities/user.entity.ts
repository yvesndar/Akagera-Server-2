/* eslint-disable prettier/prettier */
import { DemandEntity } from 'src/demand/entities/demand.entity';
import { PurchaseEntity } from 'src/purchase/entities/purchase.entity';
import { RequestEntity } from 'src/request/entities/request.entity';
import { ReturnedEntity } from 'src/returned/entities/returned.entity';
import { PartsEntity } from 'src/spare-parts/entities/spare-parts-entity';
import { ToolsEntity } from 'src/tools/entities/tools.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from './roles.enum';
import { Status } from './status.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstname: string;
  @Column({ nullable: false })
  lastname: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: false })
  username: string;
  @Column({ nullable: false })
  email: string;
  @Column({ nullable: false })
  password: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registeredAt: string;
  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;
  @Column({ type: 'enum', enum: Status, default: Status.ACTIVE })
  status: Status;
  @OneToMany(() => PartsEntity, (partsEntity) => partsEntity.receivedBy)
  partItem: PartsEntity[];
  @OneToMany(
    () => ReturnedEntity,
    (returnedEntity) => returnedEntity.requestedBy,
  )
  requester: ReturnedEntity[];
  // requestedItem: any;
  // updated: any;

  // @OneToMany(
  //   () => ReturnedEntity,
  //   (returnedEntity) => returnedEntity.receivedBy,
  // )
  // receiver: ReturnedEntity[];
  @OneToMany(
    () => PurchaseEntity,
    (purchaseEntity) => purchaseEntity.receivedBy,
  )
  receiver: PurchaseEntity[];

  @OneToMany(() => RequestEntity, (requestEntity) => requestEntity.requestedBy)
  requestedItem: RequestEntity[];

  @OneToMany(() => RequestEntity, (requestEntity) => requestEntity.updatedBy)
  updated: RequestEntity[];

  @OneToMany(() => DemandEntity, (demandEntity) => demandEntity.demandedBy)
  demandedItem: DemandEntity[];

  @OneToMany(() => ToolsEntity, (toolsEntity) => toolsEntity.receivedBy)
  toolItem: ToolsEntity[];
}
