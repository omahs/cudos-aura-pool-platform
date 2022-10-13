import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { HttpModule } from '@nestjs/axios';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { Collection } from './collection.model';
import { NFTModule } from '../nft/nft.module';
import { NFTService } from '../nft/nft.service';
import { GraphqlService } from '../graphql/graphql.service';

@Module({
    imports: [
        SequelizeModule.forFeature([Collection]),
        forwardRef(() => NFTModule),
        HttpModule,
    ],
    providers: [CollectionService, NFTService, GraphqlService],
    controllers: [CollectionController],
    exports: [SequelizeModule],
})
export class CollectionModule {}
