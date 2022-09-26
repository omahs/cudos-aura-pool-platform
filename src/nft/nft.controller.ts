import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/user/roles';
import { CreateNFTDto } from './dto/create-nft.dto';
import { UpdateNFTDto } from './dto/update-nft.dto';
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
  async findOne(): Promise<any> {
    return this.nftService.findOne();
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
    @Param('id') id: string,
    @Body() updateNFTDto: UpdateNFTDto,
  ): Promise<void> {
    return this.nftService.updateOne();
  }

  @UseGuards(RoleGuard([Role.SUPER_ADMIN]))
  @Patch(':id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<void> {
    return this.nftService.updateStatus(id, updateStatusDto.status);
  }
}
