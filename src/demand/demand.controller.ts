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
import { DemandService } from './demand.service';
import { DemandEntity } from './entities/demand.entity';
import { NewDemand } from './model/new-deamand.class';
import { UpdateDemand } from './model/update-demand.class';

@Controller('demand')
export class DemandController {
  constructor(private readonly demandService: DemandService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('new')
  @Role(Roles.ADMIN, Roles.USER, Roles.SUPPORT, Roles.TOOL_MANAGER)
  create(@Body() newDemand: NewDemand) {
    return this.demandService.addDemand(newDemand);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('allDemand')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.TOOL_MANAGER)
  async allRequestedItem(): Promise<DemandEntity[]> {
    return await this.demandService.getAllDemand();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('approve/:partNumber')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.TOOL_MANAGER)
  async approveTool(@Body() updateDemand: UpdateDemand) {
    // console.log(updateDemand);
    return await this.demandService.updateQuantityOnApprove(updateDemand);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('return/:partNumber')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.TOOL_MANAGER)
  async returnTool(@Body() updateDemand: UpdateDemand) {
    console.log(updateDemand);
    return await this.demandService.updateQuantityOnReturn(updateDemand);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('allPending')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.TOOL_MANAGER)
  async pendingTool() {
    return await this.demandService.getAllPendingDemand();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('allApproved')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.TOOL_MANAGER)
  async approvedTool() {
    return await this.demandService.getAllApprovedDemand();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('allReturned')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.TOOL_MANAGER)
  async returnedTool() {
    return await this.demandService.getAllReturnedDemand();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('myTools/:id')
  @Role(Roles.USER)
  async myTools(@Param('id') id: number) {
    return await this.demandService.getMyDemand(id);
  }
}
