import { Module } from '@nestjs/common';
import { DemandService } from './demand.service';
import { DemandController } from './demand.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandEntity } from './entities/demand.entity';
import { ToolsService } from 'src/tools/tools.service';
import { ToolsEntity } from 'src/tools/entities/tools.entity';
import { NewDemand } from './model/new-deamand.class';
import { NewTools } from 'src/tools/model/new-tool.class';

@Module({
  imports: [TypeOrmModule.forFeature([DemandEntity, ToolsEntity])],
  controllers: [DemandController],
  providers: [DemandService, ToolsService, NewDemand, NewTools],
})
export class DemandModule {}
