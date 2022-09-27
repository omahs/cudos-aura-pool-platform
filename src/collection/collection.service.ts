import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './collection.model';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection)
    private collectionModel: typeof Collection,
  ) {}

  async findAll(): Promise<Collection[]> {
    const collections = await this.collectionModel.findAll();
    return collections;
  }

  async findOne(id: number): Promise<Collection> {
    const collection = await this.collectionModel.findByPk(id);
    return collection;
  }

  async findByOwnerId(id: number): Promise<Collection[]> {
    const collections = await this.collectionModel.findAll({
      where: {
        owner_id: id,
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
    owner_id: number,
  ): Promise<Collection> {
    const collection = this.collectionModel.create({
      ...createCollectionDto,
      owner_id,
    });

    return collection;
  }

  async updateOne(
    id: number,
    updateCollectionDto: Partial<Collection>,
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

  async deleteOne(id: number): Promise<Collection> {
    const [count, [collection]] = await this.collectionModel.update(
      { deleted_at: new Date() },
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
