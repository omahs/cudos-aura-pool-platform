import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { Collection } from './collection.model';
import { NFTModule } from '../nft/nft.module';
import { NFTService } from '../nft/nft.service';

@Module({
    imports: [SequelizeModule.forFeature([Collection]), NFTModule],
    providers: [CollectionService, NFTService],
    controllers: [CollectionController],
    exports: [SequelizeModule],
})
export class CollectionModule {}
