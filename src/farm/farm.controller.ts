import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { FarmService } from './farm.service';

@Controller('farm')
export class FarmController {
  constructor(private farmService: FarmService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.farmService.findAll();
  }

  @Get(':id')
  async findOne(): Promise<any> {
    return this.farmService.findOne();
  }

  @Post()
  async create(@Body() createFarmDto: CreateFarmDto): Promise<void> {
    return this.farmService.createOne();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFarmDto: UpdateFarmDto,
  ): Promise<void> {
    return this.farmService.updateOne();
  }
}
