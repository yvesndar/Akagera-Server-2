import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SparePartsService } from 'src/spare-parts/spare-parts.service';
import { Repository } from 'typeorm';
import { ReturnedEntity } from './entities/returned.entity';
import { NewReturned } from './models/new-returned.class';

@Injectable()
export class ReturnedService {
  constructor(
    @InjectRepository(ReturnedEntity)
    private repo: Repository<ReturnedEntity>,
    private partsService: SparePartsService,
  ) {}

  async addReturn(newReturn: NewReturned) {
    const item = await this.partsService.verifyPartNumber(newReturn.partNumber);
    if (item) {
      this.partsService.updateUsedItem(
        newReturn.partNumber,
        newReturn.quantity,
      );
      return await this.repo.save(newReturn);
    } else {
      throw new NotFoundException('Item does not exist');
    }
  }

  getAllReturned(): Promise<ReturnedEntity[]> {
    return this.repo.find({ relations: ['requestedBy'] });
  }

  getMonthlyReturned() {
    return this.repo
      .createQueryBuilder('returned')
      .select(
        `sum(quantity) as quantity, date_format(returnedAt, '%m-%Y' ) as month`,
      )
      .groupBy(`date_format(returnedAt, '%m-%Y' )`)
      .getRawMany();
  }

  getThisMonthReturned() {
    return this.repo
      .createQueryBuilder('returned')
      .select(`count(id) as count, sum(quantity) as quantity`)
      .where(
        `month(returnedAt)= month(now()) and YEAR(returnedAt) = YEAR(now())`,
      )
      .getRawMany();
  }
}
