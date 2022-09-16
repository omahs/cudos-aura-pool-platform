import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionService } from './collection.service';

@Controller('collection')
export class CollectionController {
  constructor(private collectionService: CollectionService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.collectionService.findAll();
  }

  @Get(':id')
  async findOne(): Promise<any> {
    return this.collectionService.findOne();
  }

  @Post()
  async create(
    @Body() createCollectionDto: CreateCollectionDto,
  ): Promise<void> {
    return this.collectionService.createOne();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Promise<void> {
    return this.collectionService.updateOne();
  }
}
