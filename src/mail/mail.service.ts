import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { UpdateUser } from 'src/auth/models/update-user.class';
import { Repository } from 'typeorm';
import { UpdateRequest } from './models/update-request.class';
import * as bcrypt from 'bcrypt';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(UserEntity)
    private repo: Repository<UserEntity>,
    private mailerService: MailerService,
  ) {}

  async sendMail(user: UserEntity) {
    return this.mailerService.sendMail({
      to: user.email,
      from: 'yvesndaruhu@gmail.com',
      subject: 'Account Created',
      template: './newAccount',
      context: {
        firstname: user.firstname,
        lastname: user.lastname,
      },
      attachments: [
        {
          filename: 'logo.png',
          path: __dirname + '/assets/logo.png',
          cid: 'logo',
        },
      ],
    });
  }

  async sendApproveEmail(request: UpdateRequest) {
    return await this.mailerService.sendMail({
      to: 'yndaruhuye@gmail.com',
      from: 'yvesndaruhu@gmail.com',
      subject: 'Request Confirmation',
      template: './approveEmail',
      context: {
        firstname: request.requestedBy.firstname,
        lastname: request.requestedBy.lastname,
        partnumber: request.partNumber,
        serialNumber: request.serialNumber,
        description: request.description,
        new: request.new,
        used: request.used,
      },
      attachments: [
        {
          filename: 'logo.png',
          path: __dirname + '/assets/logo.png',
          cid: 'logo',
        },
      ],
    });
  }

  async sendRejectionEmail(request: UpdateRequest) {
    return await this.mailerService.sendMail({
      to: 'yndaruhuye@gmail.com',
      from: 'yvesndaruhu@gmail.com',
      subject: 'Request Rejection',
      template: './rejectEmail',
      context: {
        firstname: request.requestedBy.firstname,
        lastname: request.requestedBy.lastname,
        partnumber: request.partNumber,
        serialNumber: request.serialNumber,
        description: request.description,
        new: request.new,
        used: request.used,
      },
      attachments: [
        {
          filename: 'logo.png',
          path: __dirname + '/assets/logo.png',
          cid: 'logo',
        },
      ],
    });
  }

  async forgetPasswordEmail(user: UpdateUser): Promise<any> {
    if (user.email === null) {
      throw new BadRequestException('Enter Email');
    }
    const users = await this.repo.findOne({ where: { email: user.email } });
    if (!users) {
      throw new NotFoundException('Email not found');
    } else {
      console.log(users);
      return await this.mailerService.sendMail({
        to: users.email,
        from: 'yvesndaruhu@gmail.com',
        subject: 'Password Reset',
        template: './forgetPassword',
        context: {
          firstname: users.firstname,
          lastname: users.lastname,
          email: users.email,
          link: `http://10.8.120.189:4200/auth/resetpassword`,
        },
        attachments: [
          {
            filename: 'logo.png',
            path: __dirname + '/assets/logo.png',
            cid: 'logo',
          },
        ],
      });
    }
  }

  async resetPassword(user: UpdateUser): Promise<any> {
    console.log(user);
    const result = await this.repo.findOne({ where: { email: user.email } });
    console.log(result);
    const password = await bcrypt.hash(user.password, 12);
    console.log(password);
    result.password = password;
    this.repo.update(result.id, result);
    return await this.mailerService.sendMail({
      to: result.email,
      from: 'yvesndaruhu@gmail.com',
      subject: 'Password Reset',
      template: './resetPassword',
      context: {
        firstname: result.firstname,
        lastname: result.lastname,
        email: result.email,
      },
      attachments: [
        {
          filename: 'logo.png',
          path: __dirname + '/assets/logo.png',
          cid: 'logo',
        },
      ],
    });
  }
}
