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
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/user/roles';
import { CreateNFTDto } from './dto/create-nft.dto';
import { UpdateNFTDto } from './dto/update-nft.dto';
import { UpdateNFTStatusDto } from './dto/update-nft-status';
import { NFT } from './nft.model';
import { NFTService } from './nft.service';
import { IsCreatorGuard } from './guards/is-creator.guard';
import { NftFilters, MarketplaceNftFilters } from './utils';
import { ParseNftQueryPipe } from './pipes/nft-query.pipe';
import { GraphqlService } from 'src/graphql/graphql.service';
import { MarketplaceNftQuery } from 'src/graphql/types';

@Controller('nft')
export class NFTController {
  constructor(
    private nftService: NFTService,
    private graphqlService: GraphqlService,
  ) {}

  @Get()
  async findAll(
    @Query(ParseNftQueryPipe) filters: Partial<NftFilters>,
  ): Promise<NFT[]> {
    const result = await this.nftService.findAll(filters);

    return result;
  }

  @Get('minted')
  async findMinted(
    @Query() filters: Partial<MarketplaceNftFilters>,
  ): Promise<MarketplaceNftQuery> {
    return this.graphqlService.fetchNft(filters);
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: string): Promise<NFT> {
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
    @Param('id') id: string,
    @Body() updateNFTDto: UpdateNFTDto,
  ): Promise<NFT> {
    return this.nftService.updateOne(id, updateNFTDto);
  }

  @UseGuards(RoleGuard([Role.SUPER_ADMIN]))
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateNftStatusDto: UpdateNFTStatusDto,
  ): Promise<NFT> {
    return this.nftService.updateStatus(id, updateNftStatusDto.status);
  }

  @UseGuards(RoleGuard([Role.FARM_ADMIN]), IsCreatorGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<NFT> {
    return this.nftService.deleteOne(id);
  }
}
