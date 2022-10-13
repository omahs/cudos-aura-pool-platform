import { Test, TestingModule } from '@nestjs/testing';
import { NFTController } from './nft.controller';

describe('NFTController', () => {
    let controller: NFTController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [NFTController],
        }).compile();

        controller = module.get<NFTController>(NFTController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
