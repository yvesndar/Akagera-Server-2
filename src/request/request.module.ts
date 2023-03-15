import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { NewRequest } from './models/new-request.class';
import { UpdateRequest } from './models/update-request.class';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestEntity } from './entities/request.entity';
import { SparePartsService } from 'src/spare-parts/spare-parts.service';
import { PartsEntity } from 'src/spare-parts/entities/spare-parts-entity';

@Module({
  imports: [TypeOrmModule.forFeature([RequestEntity, PartsEntity])],
  controllers: [RequestController],
  providers: [RequestService, NewRequest, UpdateRequest, SparePartsService],
})
export class RequestModule {}
