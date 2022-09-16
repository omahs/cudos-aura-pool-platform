import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FarmController } from './farm.controller';
import { Farm } from './farm.model';
import { FarmService } from './farm.service';

@Module({
  imports: [SequelizeModule.forFeature([Farm])],
  controllers: [FarmController],
  providers: [FarmService],
})
export class FarmModule {}
