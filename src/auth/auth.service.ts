import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

import * as bcrypt from 'bcrypt';
import { NewUser } from './models/new-user.class';
import { UpdateUser } from './models/update-user.class';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async newAccount(newUser: NewUser): Promise<NewUser> {
    const user = await this.repo.findOne({
      where: { username: newUser.username },
    });
    if (user) {
      throw new BadRequestException('username already exist');
    } else {
      if (newUser.password === newUser.confirm) {
        const password = await bcrypt.hash(newUser.password, 12);
        newUser.password = password;
        return await this.repo.save(newUser);
      }
      throw new BadRequestException('password must match');
    }
  }

  async findOne(username: any): Promise<UserEntity> {
    const user = await this.repo.findOne({ where: { username: username } });
    if (user) {
      return user;
    } else {
      throw new HttpException(
        'wrong username or password',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findOne(username);
    const validPassowrd = await bcrypt.compare(password, user.password);
    if (validPassowrd) {
      const { password, ...data } = user;
      const payload = {
        username: data.username,
        id: data.id,
        role: data.role,
      };
      return {
        access_token: this.jwtService.sign(payload),
        data,
      };
    }
    throw new HttpException('wrong username or password', HttpStatus.NOT_FOUND);
  }

  async getUserById(id: number) {
    return await this.repo.findOne({ where: { id: id } });
  }

  async getAllUsers() {
    return await this.repo.find();
  }

  async updateUser(user: UpdateUser) {
    return this.repo.update(user.id, user);
  }
}
