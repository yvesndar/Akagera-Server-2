import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Role } from 'src/auth/decorators/roles.decorators';
import { Roles } from 'src/auth/entities/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { NewTools } from './model/new-tool.class';
import { ToolsService } from './tools.service';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('new')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.TOOL_MANAGER)
  newSparePart(@Body() newTool: NewTools) {
    return this.toolsService.newTools(newTool);
  }

  @Get('item/:partNumber')
  verifyPartNumber(@Param('partNumber') partNumber: string) {
    return this.toolsService.getItemByPartNumber(partNumber);
  }

  @Get('all')
  allTools() {
    return this.toolsService.getAllTools();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('update/new')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.TOOL_MANAGER)
  updateQuantity(@Body() newTools: NewTools) {
    return this.toolsService.updateToolQuantity(
      newTools.partNumber,
      newTools.quantity,
    );
  }
}
