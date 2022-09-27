import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/user/roles';
import { CreateNFTDto } from './dto/create-nft.dto';
import { UpdateNFTDto } from './dto/update-nft.dto';
import { UpdateNFTStatusDto } from './dto/update-nft-status';
import { NFT } from './nft.model';
import { NFTService } from './nft.service';

@Controller('nft')
export class NFTController {
  constructor(private nftService: NFTService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return this.nftService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<any> {
    return this.nftService.findOne(id);
  }

  @UseGuards(RoleGuard([Role.FARM_ADMIN]))
  @Post()
  async create(@Body() createNFTDto: CreateNFTDto): Promise<NFT> {
    const createdNft = await this.nftService.createOne(createNFTDto);

    return createdNft;
  }

  @UseGuards(RoleGuard([Role.SUPER_ADMIN, Role.FARM_ADMIN]))
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNFTDto: UpdateNFTDto,
  ): Promise<NFT> {
    return this.nftService.updateOne(id, updateNFTDto);
  }

  @UseGuards(RoleGuard([Role.SUPER_ADMIN]))
  @Patch(':id')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStatusDto: UpdateNFTStatusDto,
  ): Promise<NFT> {
    return this.nftService.updateStatus(id, updateStatusDto.status);
  }
}
