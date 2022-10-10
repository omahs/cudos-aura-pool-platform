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
    Request,
    Delete,
    Query,
} from '@nestjs/common';
import RoleGuard from '../auth/guards/role.guard';
import { Role } from '../user/roles';
import { CreateNFTDto } from './dto/create-nft.dto';
import { UpdateNFTDto } from './dto/update-nft.dto';
import { UpdateNFTStatusDto } from './dto/update-nft-status';
import { NFT } from './nft.model';
import { NFTService } from './nft.service';
import { IsCreatorGuard } from './guards/is-creator.guard';

@Controller('nft')
export class NFTController {
    constructor(private nftService: NFTService) {}

  @Get()
    async findAll(
    @Query('creator_id', ParseIntPipe) creator_id: number,
    @Query('collection_id', ParseIntPipe) collection_id: number,
    ): Promise<NFT[]> {
        let result = await this.nftService.findAll();

        if (creator_id) {
            result = result.filter((nft: NFT) => nft.creator_id === creator_id);
        }

        if (collection_id) {
            result = result.filter((nft: NFT) => nft.collection_id === collection_id);
        }

        return result;
    }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<NFT> {
      return this.nftService.findOne(id);
  }

  @UseGuards(RoleGuard([Role.FARM_ADMIN]))
  @Post()
  async create(
    @Request() req,
    @Body() createNFTDto: CreateNFTDto,
  ): Promise<NFT> {
      return this.nftService.createOne(createNFTDto, req.user.id);
  }

  @UseGuards(RoleGuard([Role.FARM_ADMIN]), IsCreatorGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNFTDto: UpdateNFTDto,
  ): Promise<NFT> {
      return this.nftService.updateOne(id, updateNFTDto);
  }

  @UseGuards(RoleGuard([Role.SUPER_ADMIN]))
  @Patch(':id/status')
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateNftStatusDto: UpdateNFTStatusDto,
  ): Promise<NFT> {
      return this.nftService.updateStatus(id, updateNftStatusDto.status);
  }

  @UseGuards(RoleGuard([Role.FARM_ADMIN]), IsCreatorGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<NFT> {
      return this.nftService.deleteOne(id);
  }
}
