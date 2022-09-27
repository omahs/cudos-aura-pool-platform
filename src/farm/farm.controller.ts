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
import { CollectionService } from '../collection/collection.service';
import { Collection } from '../collection/collection.model';
import RoleGuard from '../auth/guards/role.guard';
import { Role } from '../user/roles';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { Farm } from './farm.model';
import { FarmService } from './farm.service';
import { IsOwnerGuard } from './guards/is-owner.guard';

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

  @UseGuards(RoleGuard([Role.FARM_ADMIN]))
  @Post()
  async create(
    @Request() req,
    @Body() createFarmDto: CreateFarmDto,
  ): Promise<Farm> {
    return this.farmService.createOne(createFarmDto, req.user.id);
  }

  @UseGuards(RoleGuard([Role.FARM_ADMIN, Role.SUPER_ADMIN]), IsOwnerGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFarmDto: Partial<UpdateFarmDto>,
  ): Promise<Farm> {
    return this.farmService.updateOne(id, updateFarmDto);
  }

  @UseGuards(RoleGuard([Role.FARM_ADMIN]), IsOwnerGuard)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<Farm> {
    return this.farmService.deleteOne(id);
  }
}
