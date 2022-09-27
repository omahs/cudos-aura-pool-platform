import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { CollectionService } from './collection.service';
import { Collection } from './collection.model';
import { NFTService } from '../nft/nft.service';
import { NFT } from 'src/nft/nft.model';

@Controller('collection')
export class CollectionController {
  constructor(
    private collectionService: CollectionService,
    private nftService: NFTService,
  ) {}

  @Get()
  async findAll(): Promise<Collection[]> {
    return this.collectionService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Collection> {
    return this.collectionService.findOne(id);
  }

  @Get(':id/nfts')
  async findNfts(@Param('id', ParseIntPipe) id: number): Promise<NFT[]> {
    return this.nftService.findByCollectionId(id);
  }

  @Post()
  async create(
    @Request() req,
    @Body() createCollectionDto: CreateCollectionDto,
  ): Promise<Collection> {
    return this.collectionService.createOne(createCollectionDto, req.user.id);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ): Promise<Collection> {
    return this.collectionService.updateOne(id, updateCollectionDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Collection> {
    return this.collectionService.deleteOne(id);
  }
}
