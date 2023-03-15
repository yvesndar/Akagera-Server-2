import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/decorators/roles.decorators';
import { Roles } from 'src/auth/entities/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { NewReturned } from './models/new-returned.class';
import { ReturnedService } from './returned.service';

@Controller('returned')
export class ReturnedController {
  constructor(private readonly returnedService: ReturnedService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('new')
  @Role(Roles.ADMIN, Roles.USER, Roles.SUPPORT, Roles.STORE_MANAGER)
  addReturn(@Body() newReturn: NewReturned) {
    return this.returnedService.addReturn(newReturn);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  @Role(Roles.ADMIN, Roles.USER, Roles.SUPPORT, Roles.STORE_MANAGER)
  allReturn() {
    return this.returnedService.getAllReturned();
  }

  @Get('monthly')
  getMonthlyReturned() {
    return this.returnedService.getMonthlyReturned();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('thismonth')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  getthisMonthReturned() {
    return this.returnedService.getThisMonthReturned();
  }
}
