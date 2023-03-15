import { Module } from '@nestjs/common';
import { ReturnedService } from './returned.service';
import { ReturnedController } from './returned.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReturnedEntity } from './entities/returned.entity';
import { SparePartsService } from 'src/spare-parts/spare-parts.service';
import { PartsEntity } from 'src/spare-parts/entities/spare-parts-entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReturnedEntity, PartsEntity])],
  controllers: [ReturnedController],
  providers: [ReturnedService, SparePartsService],
})
export class ReturnedModule {}
