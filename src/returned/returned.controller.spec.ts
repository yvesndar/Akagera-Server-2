import { Test, TestingModule } from '@nestjs/testing';
import { ReturnedController } from './returned.controller';
import { ReturnedService } from './returned.service';

describe('ReturnedController', () => {
  let controller: ReturnedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReturnedController],
      providers: [ReturnedService],
    }).compile();

    controller = module.get<ReturnedController>(ReturnedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
