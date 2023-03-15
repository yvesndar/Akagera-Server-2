import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Role } from './decorators/roles.decorators';
import { Roles } from './entities/roles.enum';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guards';
import { NewUser } from './models/new-user.class';
import { UpdateUser } from './models/update-user.class';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('new')
  @Role(Roles.ADMIN, Roles.STORE_MANAGER, Roles.TOOL_MANAGER)
  async account(@Body() user: NewUser) {
    const data = await this.authService.newAccount(user);
    return data;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req: any) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  @Role(Roles.ADMIN, Roles.STORE_MANAGER, Roles.TOOL_MANAGER)
  async getAllUsers() {
    return this.authService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update')
  @Role(Roles.ADMIN, Roles.SUPPORT)
  updateUser(@Body() updateUser: UpdateUser) {
    return this.authService.updateUser(updateUser);
  }
}
