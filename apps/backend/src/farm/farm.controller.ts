import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CollectionService } from '../collection/collection.service';
import { Collection } from '../collection/collection.model';
import RoleGuard from '../auth/guards/role.guard';
import { Role } from '../user/roles';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './farm.model';
import { FarmService } from './farm.service';
import { IsCreatorGuard } from './guards/is-creator.guard';

@ApiTags('Farm')
@Controller('farm')
export class FarmController {
    constructor(
    private farmService: FarmService,
    private collectionService: CollectionService,
    ) {}

  @Get()
    async findAll(): Promise<Farm[]> {
        return this.farmService.findAll();
    }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Farm> {
      return this.farmService.findOne(id);
  }

  @Get(':id/collections')
  async findCollections(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Collection[]> {
      return this.collectionService.findByFarmId(id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(RoleGuard([Role.FARM_ADMIN]))
  @Post()
  async create(
    @Request() req,
    @Body() createFarmDto: CreateFarmDto,
  ): Promise<Farm> {
      return this.farmService.createOne(createFarmDto, req.user.id);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(RoleGuard([Role.FARM_ADMIN]), IsCreatorGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFarmDto: UpdateFarmDto,
  ): Promise<Farm> {
      return this.farmService.updateOne(id, updateFarmDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(RoleGuard([Role.FARM_ADMIN]), IsCreatorGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Farm> {
      return this.farmService.deleteOne(id);
  }
}
