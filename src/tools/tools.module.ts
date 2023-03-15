import { Module } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { ToolsController } from './tools.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ToolsEntity } from './entities/tools.entity';
import { NewTools } from './model/new-tool.class';

@Module({
  imports: [TypeOrmModule.forFeature([ToolsEntity])],
  controllers: [ToolsController],
  providers: [ToolsService, NewTools],
})
export class ToolsModule {}
