import { Module } from '@nestjs/common';
import { SparePartsService } from './spare-parts.service';
import { SparePartsController } from './spare-parts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PartsEntity } from './entities/spare-parts-entity';
import { UserEntity } from 'src/auth/entities/user.entity';
import { NewParts } from './model/new-parts.class';
import { UpdateParts } from './model/update-parts.class';

@Module({
  imports: [TypeOrmModule.forFeature([PartsEntity, UserEntity])],
  controllers: [SparePartsController],
  providers: [SparePartsService, NewParts, UpdateParts],
})
export class SparePartsModule {}
