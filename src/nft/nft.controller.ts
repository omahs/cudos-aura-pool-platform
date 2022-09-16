import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateNFTDto } from './dto/create-nft.dto';
import { UpdateNFTDto } from './dto/update-nft.dto';
import { NFTService } from './nft.service';

@Controller('nft')
export class NFTController {
  constructor(private nftService: NFTService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.nftService.findAll();
  }

  @Get(':id')
  async findOne(): Promise<any> {
    return this.nftService.findOne();
  }

  @Post()
  async create(@Body() createNFTDto: CreateNFTDto): Promise<void> {
    return this.nftService.createOne();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNFTDto: UpdateNFTDto,
  ): Promise<void> {
    return this.nftService.updateOne();
  }
}
