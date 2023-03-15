import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ToolsService } from 'src/tools/tools.service';
import { Repository } from 'typeorm';
import { DemandEntity } from './entities/demand.entity';
import { Status } from './entities/status.enum';
import { NewDemand } from './model/new-deamand.class';
import { UpdateDemand } from './model/update-demand.class';

@Injectable()
export class DemandService {
  constructor(
    @InjectRepository(DemandEntity)
    private repo: Repository<DemandEntity>,
    private toolService: ToolsService,
  ) {}

  async addDemand(newDemand: NewDemand) {
    const item = await this.toolService.getItemByPartNumber(
      newDemand.partNumber,
    );
    if (!item) {
      throw new NotFoundException(
        `No Tool with part number
        ${newDemand.partNumber}`,
      );
    }
    return this.repo.save(newDemand);
  }

  async verifyStockQuantity(updateDemand: UpdateDemand) {
    const item = await this.toolService.verifyQuantity(
      updateDemand.partNumber,
      updateDemand.quantity,
    );
    return item;
  }

  async getItemByPartNumber(partNumber: string) {
    return await this.repo.findOne({
      where: { partNumber: partNumber },
    });
  }

  async updateQuantityOnApprove(updateDemand: UpdateDemand) {
    const tool = await this.toolService.verifyQuantity(
      updateDemand.partNumber,
      updateDemand.quantity,
    );
    if (tool) {
      updateDemand.status = Status.TAKEN;
      this.repo.update(updateDemand.id, updateDemand);
    } else {
      throw new BadRequestException('Not Enough Quantity');
    }
  }

  async updateQuantityOnReturn(updateDemand: UpdateDemand) {
    const tool = await this.toolService.returnedTools(
      updateDemand.partNumber,
      updateDemand.quantity,
    );
    console.log('demand service', tool);
    if (tool) {
      updateDemand.status = Status.RETURNED;
      return await this.repo.update(updateDemand.id, updateDemand);
    }
  }

  async getRequestById(id: number): Promise<DemandEntity> {
    return await this.repo.findOne({
      where: { id: id },
      relations: ['requestedBy'],
    });
  }

  update(id: number, updateDemand: UpdateDemand) {
    return this.repo.update(id, updateDemand);
  }

  getAllDemand() {
    return this.repo.find({ relations: ['demandedBy'] });
  }

  getAllApprovedDemand() {
    return this.repo.find({
      where: { status: Status.TAKEN },
      relations: ['demandedBy'],
    });
  }

  getAllPendingDemand() {
    return this.repo.find({
      where: { status: Status.PENDING },
      relations: ['demandedBy'],
    });
  }

  getAllReturnedDemand() {
    return this.repo.find({
      where: { status: Status.RETURNED },
      relations: ['demandedBy'],
    });
  }

  async getMyDemand(id: number) {
    return await this.repo
      .createQueryBuilder('demand')
      .select(`*`)
      .where(`demandedById = ${id}`)
      .getRawMany();
  }
}
