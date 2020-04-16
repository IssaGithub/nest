import { Test, TestingModule } from '@nestjs/testing';
import { VorgaengeService } from './vorgaenge.service';

describe('VorgaengeService', () => {
  let service: VorgaengeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VorgaengeService],
    }).compile();

    service = module.get<VorgaengeService>(VorgaengeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
