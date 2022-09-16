import { Test, TestingModule } from '@nestjs/testing';
import { NFTService } from './nft.service';

describe('NFTService', () => {
  let service: NFTService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NFTService],
    }).compile();

    service = module.get<NFTService>(NFTService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
