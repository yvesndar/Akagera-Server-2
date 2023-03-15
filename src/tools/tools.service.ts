import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ToolsEntity } from './entities/tools.entity';
import { NewTools } from './model/new-tool.class';

@Injectable()
export class ToolsService {
  constructor(
    @InjectRepository(ToolsEntity)
    private repo: Repository<ToolsEntity>,
  ) {}

  newTools(newTool: NewTools) {
    return this.repo.save(newTool);
  }

  getAllTools() {
    return this.repo.find({ relations: ['receivedBy'] });
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
    throw new NotFoundException(`No Tool found with part number ${partNumber}`);
  }

  async updateToolQuantity(partNumber: string, quantity: number) {
    console.log(partNumber, quantity);
    const item = await this.getItemByPartNumber(partNumber);
    if (item) {
      item.quantity = item.quantity + quantity;
      return this.repo
        .createQueryBuilder()
        .update(ToolsEntity)
        .set({ quantity: item.quantity })
        .where({ partNumber: partNumber })
        .execute();
    }
  }

  async verifyQuantity(number: any, quantity: number) {
    const item = await this.getItemByPartNumber(number);
    if (item.quantity >= quantity) {
      const newQauntity = item.quantity - quantity;
      this.updatedInvetoryQuantity(number, newQauntity);
      return item;
    } else {
      throw new BadRequestException('No Enough Quantity');
    }
  }

  async returnedTools(number: any, quantity: number) {
    const item = await this.getItemByPartNumber(number);
    if (item) {
      const newQauntity = item.quantity + quantity;
      console.log(newQauntity, item.quantity, quantity);
      return this.updatedInvetoryQuantity(number, newQauntity);
    }
  }

  async updatedInvetoryQuantity(number: string, newQuantity: any) {
    console.log(number, newQuantity);
    return this.repo
      .createQueryBuilder()
      .update(ToolsEntity)
      .set({ quantity: newQuantity, updatedAt: new Date() })
      .where({ partNumber: number })
      .execute();
  }
}
