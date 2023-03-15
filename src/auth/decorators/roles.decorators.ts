/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { Roles } from '../entities/roles.enum';

export const ROLES_KEY = 'roles';
export const Role = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
