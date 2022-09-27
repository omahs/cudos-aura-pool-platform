import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Collection } from '../collection/collection.model';
import { CreateNFTDto } from './dto/create-nft.dto';
import { UpdateNFTDto } from './dto/update-nft.dto';
import { NFT } from './nft.model';
import { NftStatus } from './utils';

@Injectable()
export class NFTService {
  constructor(
    @InjectModel(NFT)
    private nftModel: typeof NFT,
  ) {}

  async findAll(): Promise<NFT[]> {
    const nfts = await this.nftModel.findAll({
      include: [Collection],
    });
    return nfts;
  }

  async findByCollectionId(id: number): Promise<NFT[]> {
    const nfts = await this.nftModel.findAll({
      where: {
        collection_id: id,
      },
    });

    return nfts;
  }

  async findByOwnerId(id: number): Promise<NFT[]> {
    const nfts = await this.nftModel.findAll({
      where: {
        owner_id: id,
      },
    });

    return nfts;
  }

  async findOne(id: number): Promise<NFT> {
    const nft = await this.nftModel.findByPk(id);
    return nft;
  }

  async createOne(createNFTDto: CreateNFTDto): Promise<NFT> {
    const nft = this.nftModel.create({
      ...createNFTDto,
      status: NftStatus.QUEUED,
    });

    return nft;
  }

  async updateOne(id: number, updateNFTDto: UpdateNFTDto): Promise<NFT> {
    const [count, [nft]] = await this.nftModel.update(updateNFTDto, {
      where: { id },
      returning: true,
    });

    return nft;
  }

  async updateStatus(id: number, status: NftStatus): Promise<NFT> {
    const [count, [nft]] = await this.nftModel.update(
      { status },
      {
        where: { id },
        returning: true,
      },
    );

    return nft;
  }
}
