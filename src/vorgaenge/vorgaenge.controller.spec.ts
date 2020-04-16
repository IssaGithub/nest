import { Test, TestingModule } from '@nestjs/testing';
import { VorgaengeController } from './vorgaenge.controller';

describe('Vorgaenge Controller', () => {
  let controller: VorgaengeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VorgaengeController],
    }).compile();

    controller = module.get<VorgaengeController>(VorgaengeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
