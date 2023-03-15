import { Body, Controller, Post, Put } from '@nestjs/common';
import { UserEntity } from 'src/auth/entities/user.entity';
import { UpdateUser } from 'src/auth/models/update-user.class';
import { MailService } from './mail.service';
import { UpdateRequest } from './models/update-request.class';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('newUser')
  async sendEmailMessage(@Body() user: UserEntity) {
    return await this.mailService.sendMail(user);
  }

  @Post('approvalEmail')
  async SendApprovalEmail(@Body() request: UpdateRequest) {
    return await this.mailService.sendApproveEmail(request);
  }

  @Post('rejectalEmail')
  async SendRejectalEmail(@Body() request: UpdateRequest) {
    return await this.mailService.sendRejectionEmail(request);
  }

  @Post('forgetPasswordemail')
  async sendForgetPasswordEmail(@Body() user: UpdateUser) {
    console.log(user);
    return await this.mailService.forgetPasswordEmail(user);
  }

  @Put('resetPassword')
  async resetPassword(@Body() user: UpdateUser) {
    return await this.mailService.resetPassword(user);
  }
}
