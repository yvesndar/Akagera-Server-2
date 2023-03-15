import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Role } from 'src/auth/decorators/roles.decorators';
import { Roles } from 'src/auth/entities/roles.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guards';
import { NewPurchase } from './model/new-purchase.class';
import { PurchaseService } from './purchase.service';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('new')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.TOOL_MANAGER, Roles.STORE_MANAGER)
  create(@Body() newPurchase: NewPurchase) {
    return this.purchaseService.newPurchase(newPurchase);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.TOOL_MANAGER, Roles.STORE_MANAGER)
  async allPurchase() {
    return this.purchaseService.getAllPurchase();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('monthlyPurchases')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.TOOL_MANAGER, Roles.STORE_MANAGER)
  async monthlyPurchases() {
    return await this.purchaseService.getMonthlyPurchased();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('monthlyPurchasesNumber')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.TOOL_MANAGER, Roles.STORE_MANAGER)
  async monthlyPurchasesNumber() {
    return await this.purchaseService.getMonthlyPurchasedNumber();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('thisMonthPurchases')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.TOOL_MANAGER, Roles.STORE_MANAGER)
  async thisMonthPurchases() {
    return await this.purchaseService.getThisMonthPurchases();
  }
}
