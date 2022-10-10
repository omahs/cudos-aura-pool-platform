import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
  Request,
  Delete,
  Query,
  NotFoundException,
} from '@nestjs/common';
import RoleGuard from 'src/auth/guards/role.guard';
import { Role } from 'src/user/roles';
import { CreateNFTDto } from './dto/create-nft.dto';
import { UpdateNFTDto } from './dto/update-nft.dto';
import { UpdateNFTStatusDto } from './dto/update-nft-status';
import { NFT } from './nft.model';
import { NFTService } from './nft.service';
import { IsCreatorGuard } from './guards/is-creator.guard';
import { NftFilters, MarketplaceNftFilters, NftStatus } from './utils';
import { ParseNftQueryPipe } from './pipes/nft-query.pipe';
import { GraphqlService } from 'src/graphql/graphql.service';
import { MarketplaceNftQuery } from 'src/graphql/types';
import { CheckStatusDto } from './dto/check-status.dto';

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

  @Put('minted/check-status')
  async mint(@Body() checkStatusDto: CheckStatusDto): Promise<NFT> {
    const { tx_hash } = checkStatusDto;

    const { uuid } = await this.graphqlService.getMintedNftUuid(tx_hash);

    return this.nftService.updateStatus(uuid, NftStatus.MINTED);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<NFT> {
    const nft = await this.nftService.findOne(id);

    if (!nft) {
      throw new NotFoundException();
    }

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
