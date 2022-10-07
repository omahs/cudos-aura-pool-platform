import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NFTService } from './nft.service';
import { NFTController } from './nft.controller';
import { NFT } from './nft.model';
import { HttpModule } from '@nestjs/axios';
import { GraphqlModule } from 'src/graphql/graphql.module';
import { GraphqlService } from 'src/graphql/graphql.service';

@Module({
  imports: [SequelizeModule.forFeature([NFT]), HttpModule, GraphqlModule],
  providers: [NFTService, GraphqlService],
  controllers: [NFTController],
  exports: [SequelizeModule],
})
export class NFTModule {}
