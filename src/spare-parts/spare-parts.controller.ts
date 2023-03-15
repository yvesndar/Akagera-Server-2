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
import { NewParts } from './model/new-parts.class';
import { SparePartsService } from './spare-parts.service';

@Controller('spare-parts')
export class SparePartsController {
  constructor(private readonly sparePartsService: SparePartsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('new')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  newSparePart(@Body() newParts: NewParts) {
    return this.sparePartsService.newPart(newParts);
  }

  @Get('item/:partNumber')
  verifyPartNumber(@Param('partNumber') partNumber: string) {
    return this.sparePartsService.getItemByPartNumber(partNumber);
  }

  @Get('all')
  allSpareParts() {
    return this.sparePartsService.getAllSpareParts();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('update/new')
  @Role(Roles.ADMIN, Roles.SUPPORT, Roles.STORE_MANAGER)
  updateQuantity(@Body() newParts: NewParts) {
    console.log(newParts);
    return this.sparePartsService.updateNewItem(
      newParts.partNumber,
      newParts.new,
    );
  }
}
