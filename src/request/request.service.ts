import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SparePartsService } from 'src/spare-parts/spare-parts.service';
import { Repository } from 'typeorm';
import { RequestEntity } from './entities/request.entity';
import { Status } from './entities/status.enum';
import { NewRequest } from './models/new-request.class';
import { UpdateRequest } from './models/update-request.class';

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(RequestEntity)
    private repo: Repository<RequestEntity>,
    private partService: SparePartsService,
  ) {}

  async addRequest(newRequest: NewRequest) {
    const item = await this.partService.getItemByPartNumber(
      newRequest.partNumber,
    );
    if (!item) {
      throw new NotFoundException(
        `no item with part number
        ${newRequest.partNumber}`,
      );
    }
    return this.repo.save(newRequest);
  }

  getAllPendingRequestedItem(): Promise<RequestEntity[]> {
    return this.repo.find({
      where: { status: Status.PENDING },
      order: { updatedAt: 'DESC' },
      relations: ['requestedBy'],
    });
  }

  getApprovedRequestSample(): Promise<RequestEntity[]> {
    return this.repo.find({
      where: { status: Status.APPROVED },
      order: { updatedAt: 'DESC' },
      relations: ['requestedBy', 'updatedBy'],
      take: 5,
    });
  }

  getRejectedRequestSample(): Promise<RequestEntity[]> {
    return this.repo.find({
      where: { status: Status.REJECTED },
      order: { updatedAt: 'DESC' },
      relations: ['requestedBy', 'updatedBy'],
      take: 5,
    });
  }

  async getAllApprovedRequestedItem(): Promise<RequestEntity[]> {
    return await this.repo.find({
      where: { status: Status.APPROVED },
      order: { updatedAt: 'DESC' },
      relations: ['requestedBy', 'updatedBy'],
    });
  }

  async getAllRejectedRequestedItem(): Promise<RequestEntity[]> {
    return await this.repo.find({
      where: { status: Status.REJECTED },
      relations: ['requestedBy', 'updatedBy'],
    });
  }

  getAllRequestedItem(): Promise<RequestEntity[]> {
    return this.repo.find({
      relations: ['requestedBy', 'updatedBy'],
    });
  }

  getAllRequestedItemSample(): Promise<RequestEntity[]> {
    return this.repo.find({
      order: { requestedAt: 'DESC' },
      relations: ['requestedBy', 'updatedBy'],
      take: 10,
    });
  }

  async getApproveStatus(updateRequest: UpdateRequest) {
    const item = await this.verifyStockQuantity(updateRequest);
    console.log(updateRequest.id);
    const request = await this.getRequestById(updateRequest.id);
    console.log(request);
    if (item) {
      updateRequest.status = Status.APPROVED;
      updateRequest.updatedAt = new Date();
      this.repo.update(updateRequest.id, updateRequest);
    }
  }

  async getRejectStatus(updateRequest: UpdateRequest) {
    updateRequest.status = Status.REJECTED;
    updateRequest.updatedAt = new Date();
    return this.repo.update(updateRequest.id, updateRequest);
  }

  async verifyStockQuantity(updateRequest: UpdateRequest) {
    const item = await this.partService.verifyQuantity(
      updateRequest.partNumber,
      updateRequest.new,
      updateRequest.used,
    );

    return item;
  }

  async getRequestById(id: number): Promise<RequestEntity> {
    return await this.repo.findOne({
      where: { id: id },
      relations: ['requestedBy'],
    });
  }

  update(id: number, updateRequest: UpdateRequest) {
    return this.repo.update(id, updateRequest);
  }

  async getMyRequest(id: number) {
    return await this.repo
      .createQueryBuilder('request')
      .select('*')
      .where(`requestedById = ${id}`)
      .getRawMany();
  }

  async getThisMonthAllRequest() {
    return await this.repo
      .createQueryBuilder('RequestEntity')
      .select('*')
      .where(
        'month(requestedAt)= month(now()) and YEAR(requestedAt) = YEAR(now())',
      )
      .getRawMany();
  }

  async getThisMonthAllPendingRequest() {
    return await this.repo
      .createQueryBuilder('RequestEntity')
      .select('*')
      .where(
        `month(requestedAt)= month(now()) and YEAR(requestedAt) = YEAR(now()) and status='Pending'`,
      )
      .getRawMany();
  }

  async getThisMonthAllApprovedRequest() {
    return await this.repo
      .createQueryBuilder('RequestEntity')
      .select(`*`)
      .where(
        `month(requestedAt)= month(now()) and YEAR(requestedAt) = YEAR(now()) and status='Approved'`,
      )
      .getRawMany();
  }

  async getThisMonthAllRejectedRequest() {
    return await this.repo
      .createQueryBuilder(`RequestEntity`)
      .select(`*`)
      .where(
        `month(requestedAt)= month(now()) and YEAR(requestedAt) = YEAR(now()) and status='Rejected'`,
      )
      .getRawMany();
  }

  async getMonthlyAllRequestDetails() {
    return await this.repo
      .createQueryBuilder('RequestEntity')
      .select(
        `count(id) as count,  date_format(requestedAt, '%m-%Y' ) as month`,
      )
      .groupBy(`month`)
      .orderBy(`month`, 'ASC')
      .getRawMany();
  }

  async getMonthlyAllPendingRequestDetails() {
    return await this.repo
      .createQueryBuilder('RequestEntity')
      .select(
        `count(id) as count,  date_format(requestedAt, '%m-%Y' ) as month`,
      )
      .where(`status='Pending'`)
      .groupBy(`month`)
      .orderBy(`month`, 'ASC')
      .getRawMany();
  }

  async getMonthlyAllApprovedRequestDetails() {
    return await this.repo
      .createQueryBuilder('RequestEntity')
      .select(
        `count(id) as count,  date_format(requestedAt, '%m-%Y' ) as month`,
      )
      .where(`status='Approved'`)
      .groupBy(`month`)
      .orderBy(`month`, 'ASC')
      .getRawMany();
  }

  async getMonthlyAllRejectedRequestDetails() {
    return await this.repo
      .createQueryBuilder('RequestEntity')
      .select(
        `count(id) as count,  date_format(requestedAt, '%m-%Y' ) as month`,
      )
      .where(`status='Rejected'`)
      .groupBy(`month`)
      .orderBy(`month`, 'ASC')
      .getRawMany();
  }
}
