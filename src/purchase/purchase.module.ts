import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseEntity } from './entities/purchase.entity';
import { NewPurchase } from './model/new-purchase.class';
import { NewParts } from './model/new-parts.class';
import { ToolsService } from 'src/tools/tools.service';
import { SparePartsService } from 'src/spare-parts/spare-parts.service';
import { PartsEntity } from 'src/spare-parts/entities/spare-parts-entity';
import { ToolsEntity } from 'src/tools/entities/tools.entity';
import { NewTools } from 'src/tools/model/new-tool.class';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseEntity, PartsEntity, ToolsEntity]),
  ],
  controllers: [PurchaseController],
  providers: [
    PurchaseService,
    NewPurchase,
    NewParts,
    ToolsService,
    SparePartsService,
    NewTools,
  ],
})
export class PurchaseModule {}
