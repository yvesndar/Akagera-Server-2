import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PartsEntity } from './entities/spare-parts-entity';
import { NewParts } from './model/new-parts.class';

@Injectable()
export class SparePartsService {
  constructor(
    @InjectRepository(PartsEntity)
    private repo: Repository<PartsEntity>,
  ) {}
  newPart(newParts: NewParts) {
    console.log('Parts', newParts);
    return this.repo.save(newParts);
  }

  async getAllSpareParts() {
    return await this.repo.find({ relations: ['receivedBy'] });
  }

  //verify if part number exist
  async verifyPartNumber(partNumber: string) {
    return await this.repo.findOne({
      where: { partNumber: partNumber },
    });
  }

  async getItemByPartNumber(partNumber: string) {
    const item = await this.repo.findOne({
      where: { partNumber: partNumber },
    });
    if (item) {
      return item;
    }
    throw new NotFoundException(
      `No Spare Part found with part number ${partNumber}`,
    );
  }

  async updateNewItem(partNumber: string, quantity: number) {
    // console.log('part service', partNumber, quantity);
    const item = await this.getItemByPartNumber(partNumber);
    if (item) {
      item.new = item.new + quantity;
      return this.repo
        .createQueryBuilder()
        .update(PartsEntity)
        .set({ new: item.new })
        .where({ partNumber: partNumber })
        .execute();
    }
  }

  async updateUsedItem(partNumber: string, quantity: number) {
    console.log(partNumber, quantity);
    const item = await this.getItemByPartNumber(partNumber);
    if (item) {
      item.used = item.used + quantity;
      return this.repo
        .createQueryBuilder()
        .update(PartsEntity)
        .set({ used: item.used })
        .where({ partNumber: partNumber })
        .execute();
    }
  }

  async verifyQuantity(number: any, requestNew: number, requestUsed: number) {
    const item = await this.getItemByPartNumber(number);
    if (item.new >= requestNew && item.used >= requestUsed) {
      const newQauntity = item.new - requestNew;
      const usedQauntity = item.used - requestUsed;
      console.log(
        'current',
        newQauntity,
        'request',
        newQauntity,
        'new',
        newQauntity,
      );
      this.updatedInvetoryQuantity(number, newQauntity, usedQauntity);
      return item;
    } else {
      throw new BadRequestException('Not Enough Quantity');
    }
  }

  async updatedInvetoryQuantity(
    number: string,
    newQuantity: any,
    usedQuantity: any,
  ) {
    console.log(number, newQuantity, usedQuantity);
    return this.repo
      .createQueryBuilder()
      .update(PartsEntity)
      .set({ new: newQuantity, used: usedQuantity, updatedAt: new Date() })
      .where({ partNumber: number })
      .execute();
  }
}
