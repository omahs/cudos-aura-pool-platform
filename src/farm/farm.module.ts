import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CollectionModule } from '../collection/collection.module';
import { CollectionService } from '../collection/collection.service';
import { FarmController } from './farm.controller';
import { Farm } from './farm.model';
import { FarmService } from './farm.service';

@Module({
  imports: [SequelizeModule.forFeature([Farm]), CollectionModule],
  controllers: [FarmController],
  providers: [FarmService, CollectionService],
})
export class FarmModule {}
