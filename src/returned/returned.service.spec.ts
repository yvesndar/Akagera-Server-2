import { Test, TestingModule } from '@nestjs/testing';
import { ReturnedService } from './returned.service';

describe('ReturnedService', () => {
  let service: ReturnedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReturnedService],
    }).compile();

    service = module.get<ReturnedService>(ReturnedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
