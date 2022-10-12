import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './collection.model';
import { CollectionFilters, CollectionStatus } from './utils';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection)
    private collectionModel: typeof Collection,
  ) {}

  async findAll(filters: Partial<CollectionFilters>): Promise<Collection[]> {
    const collections = await this.collectionModel.findAll({
      where: { ...filters },
    });
    return collections;
  }

  async findOne(id: number): Promise<Collection> {
    const collection = await this.collectionModel.findByPk(id);

    if (!collection) {
      throw new NotFoundException();
    }

    return collection;
  }

  async findByCreatorId(id: number): Promise<Collection[]> {
    const collections = await this.collectionModel.findAll({
      where: {
        creator_id: id,
      },
    });

    return collections;
  }

  async findByFarmId(id: number): Promise<Collection[]> {
    const collections = await this.collectionModel.findAll({
      where: {
        farm_id: id,
      },
    });

    return collections;
  }

  async createOne(
    createCollectionDto: CreateCollectionDto,
    creator_id: number,
  ): Promise<Collection> {
    const collection = this.collectionModel.create({
      ...createCollectionDto,
      status: CollectionStatus.QUEUED,
      creator_id,
    });

    return collection;
  }

  async updateOne(
    id: number,
    updateCollectionDto: Partial<UpdateCollectionDto>,
  ): Promise<Collection> {
    const [count, [collection]] = await this.collectionModel.update(
      updateCollectionDto,
      {
        where: { id },
        returning: true,
      },
    );

    return collection;
  }

  async updateStatus(
    id: number,
    status: CollectionStatus,
  ): Promise<Collection> {
    const [count, [collection]] = await this.collectionModel.update(
      {
        status,
      },
      {
        where: { id },
        returning: true,
      },
    );

    return collection;
  }

  async deleteOne(id: number): Promise<Collection> {
    const [count, [collection]] = await this.collectionModel.update(
      { deleted_at: new Date(), status: CollectionStatus.DELETED },
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    return collection;
  }
}
