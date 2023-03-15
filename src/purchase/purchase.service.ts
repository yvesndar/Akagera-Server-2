import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SparePartsService } from 'src/spare-parts/spare-parts.service';
import { ToolsService } from 'src/tools/tools.service';
import { Repository } from 'typeorm';
import { PurchaseEntity } from './entities/purchase.entity';
import { NewPurchase } from './model/new-purchase.class';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(PurchaseEntity)
    private repo: Repository<PurchaseEntity>,
    private toolsService: ToolsService,
    private partsService: SparePartsService,
  ) {}

  async newPurchase(newPurchase: NewPurchase) {
    console.log(newPurchase);
    newPurchase.total =
      newPurchase.pricePerUnit * newPurchase.quantity * newPurchase.exchange;
    if (newPurchase.category === 'Tools') {
      const item = await this.toolsService.verifyPartNumber(
        newPurchase.partNumber,
      );
      this.repo.save(newPurchase);
      if (item) {
        console.log('already exist');
        return true;
      } else {
        console.log('new tool');
        return false;
      }
    }
    if (newPurchase.category === 'Spare Parts') {
      const item = await this.partsService.verifyPartNumber(
        newPurchase.partNumber,
      );
      this.repo.save(newPurchase);
      if (item) {
        console.log('already exist');
        return true;
      } else {
        console.log('new part');
        return false;
      }
    }
  }

  async getAllPurchase() {
    return await this.repo.find();
  }

  async getMonthlyPurchased() {
    return await this.repo
      .createQueryBuilder('PurchaseEntity')
      .select(`sum(total) as sum,  date_format(purchasedOn, '%m-%Y' ) as month`)
      .groupBy(`month`)
      .orderBy(`month`, 'ASC')
      .getRawMany();
  }

  async getMonthlyPurchasedNumber() {
    return await this.repo
      .createQueryBuilder('PurchaseEntity')
      .select(
        `count(id) as count,  date_format(purchasedOn, '%m-%Y' ) as month`,
      )
      .groupBy(`month`)
      .orderBy(`month`, 'ASC')
      .getRawMany();
  }

  async getThisMonthPurchases() {
    return await this.repo
      .createQueryBuilder('PurchaseEntity')
      .select(`sum(total) as sum, count(id) as count`)
      .where(
        `month(purchasedOn)= month(now()) and YEAR(purchasedOn) = YEAR(now())`,
      )
      .getRawMany();
  }
}
