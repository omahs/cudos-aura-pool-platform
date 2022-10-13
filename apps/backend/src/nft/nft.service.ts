import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { v4 as uuid } from 'uuid';
import { CreateNFTDto } from './dto/create-nft.dto';
import { UpdateNFTDto } from './dto/update-nft.dto';
import { NFT } from './nft.model';
import { NftFilters, NftStatus } from './utils';

@Injectable()
export class NFTService {
    constructor(
    @InjectModel(NFT)
    private nftModel: typeof NFT,
    ) {}

    async findAll(filters: Partial<NftFilters>): Promise<NFT[]> {
        const nfts = await this.nftModel.findAll({
            where: { ...filters },
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

    async findByCreatorId(id: number): Promise<NFT[]> {
        const nfts = await this.nftModel.findAll({
            where: {
                creator_id: id,
            },
        });

        return nfts;
    }

    async findOne(id: string): Promise<NFT> {
        return this.nftModel.findByPk(id);
    }

    async createOne(
        createNFTDto: CreateNFTDto,
        creator_id: number,
    ): Promise<NFT> {
        const nft = this.nftModel.create({
            ...createNFTDto,
            uuid: uuid(),
            creator_id,
            status: NftStatus.QUEUED,
        });

        return nft;
    }

    async updateOne(
        id: string,
        updateNFTDto: Partial<UpdateNFTDto>,
    ): Promise<NFT> {
        const [count, [nft]] = await this.nftModel.update(updateNFTDto, {
            where: { id },
            returning: true,
        });

        return nft;
    }

    async updateStatus(id: string, status: NftStatus): Promise<NFT> {
        const [count, [nft]] = await this.nftModel.update(
            { status },
            {
                where: { id },
                returning: true,
            },
        );

        return nft;
    }

    async deleteOne(id: string): Promise<NFT> {
        const [count, [nft]] = await this.nftModel.update(
            { deleted_at: new Date(), status: NftStatus.DELETED },
            {
                where: {
                    id,
                },
                returning: true,
            },
        );

        return nft;
    }
}
