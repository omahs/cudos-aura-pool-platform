import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './farm.model';

@Injectable()
export class FarmService {
  constructor(
    @InjectModel(Farm)
    private farmModel: typeof Farm,
  ) {}

  async findAll(): Promise<Farm[]> {
    const farms = await this.farmModel.findAll();
    return farms;
  }

  async findOne(id: number): Promise<Farm> {
    const farm = await this.farmModel.findByPk(id);
    return farm;
  }

  async createOne(
    createFarmDto: CreateFarmDto,
    owner_id: number,
  ): Promise<Farm> {
    const farm = this.farmModel.create({
      ...createFarmDto,
      owner_id,
    });

    return farm;
  }

  async updateOne(id: number, updateFarmDto: Partial<Farm>): Promise<Farm> {
    const [updatedRows, [farm]] = await this.farmModel.update(updateFarmDto, {
      where: { id },
      returning: true,
    });

    return farm;
  }

  async deleteOne(id: number): Promise<Farm> {
    const [updatedRows, [farm]] = await this.farmModel.update(
      { deleted_at: new Date() },
      {
        where: {
          id,
        },
        returning: true,
      },
    );

    return farm;
  }
}
