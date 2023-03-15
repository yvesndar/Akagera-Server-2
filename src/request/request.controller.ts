import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/decorators/roles.decorators';
import { Roles } from 'src/auth/entities/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { RequestEntity } from './entities/request.entity';
import { NewRequest } from './models/new-request.class';
import { UpdateRequest } from './models/update-request.class';
import { RequestService } from './request.service';

@Controller('request')
export class RequestController {
  constructor(private readonly requestService: RequestService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('register')
  @Role(Roles.ADMIN, Roles.USER, Roles.SUPPORT, Roles.STORE_MANAGER)
  create(@Body() newRequest: NewRequest) {
    return this.requestService.addRequest(newRequest);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('approve/:id')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async approve(@Body() updateRequest: UpdateRequest) {
    console.log(updateRequest);
    return await this.requestService.getApproveStatus(updateRequest);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('reject/:id')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async reject(@Body() updateRequest: UpdateRequest) {
    return await this.requestService.getRejectStatus(updateRequest);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('allRequest')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async allRequestedItem(): Promise<RequestEntity[]> {
    return await this.requestService.getAllRequestedItem();
  }

  // @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all/:id')
  // @Role(Roles.USER)
  getAllMyRequest(@Param('id') id: number) {
    return this.requestService.getMyRequest(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('allRequestSample')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async allRequestedItemSample(): Promise<RequestEntity[]> {
    return await this.requestService.getAllRequestedItemSample();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('allPendingRequest')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async allPendingRequestedItem(): Promise<RequestEntity[]> {
    return await this.requestService.getAllPendingRequestedItem();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('allApprovedRequest')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async allApprovedRequestedItem(): Promise<RequestEntity[]> {
    return await this.requestService.getAllApprovedRequestedItem();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('allRejectedRequest')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async allRejectedRequestedItem(): Promise<RequestEntity[]> {
    return await this.requestService.getAllRejectedRequestedItem();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('approvedRequestSample')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async approvedRequestedSample(): Promise<RequestEntity[]> {
    return await this.requestService.getApprovedRequestSample();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('rejectedRequestSample')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async rejectedRequestedSample(): Promise<RequestEntity[]> {
    return await this.requestService.getRejectedRequestSample();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('thisMonthAll')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async thisMonthAllRequest(): Promise<RequestEntity[]> {
    return await this.requestService.getThisMonthAllRequest();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('thisMonthPending')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async thisMonthPendingRequest(): Promise<RequestEntity[]> {
    return await this.requestService.getThisMonthAllPendingRequest();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('thisMonthApproved')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async thisMonthApprovedRequest(): Promise<RequestEntity[]> {
    return await this.requestService.getThisMonthAllApprovedRequest();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('thisMonthRejected')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async thisMonthRejectedRequest(): Promise<RequestEntity[]> {
    return await this.requestService.getThisMonthAllRejectedRequest();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('monthlyRequest')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async thisMonthAllRequestDetails(): Promise<RequestEntity[]> {
    return await this.requestService.getMonthlyAllRequestDetails();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('monthlyPending')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async thisMonthPendingRequestDetails(): Promise<RequestEntity[]> {
    return await this.requestService.getMonthlyAllPendingRequestDetails();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('monthlyApproved')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async thisMonthApprovedRequestDetails(): Promise<RequestEntity[]> {
    return await this.requestService.getMonthlyAllApprovedRequestDetails();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('monthlyRejected')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  async thisMonthRejectedRequestDetails(): Promise<RequestEntity[]> {
    return await this.requestService.getMonthlyAllRejectedRequestDetails();
  }
}
