import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NFTService } from './nft.service';
import { NFTController } from './nft.controller';
import { NFT } from './nft.model';

@Module({
  imports: [SequelizeModule.forFeature([NFT])],
  providers: [NFTService],
  controllers: [NFTController],
  exports: [SequelizeModule],
})
export class NFTModule {}
