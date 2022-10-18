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
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import RoleGuard from '../auth/guards/role.guard';
import { ChangePasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserDto } from './dto/get-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsUserGuard } from './guards/is-user.guard'
import { Role } from './roles';
import { User } from './user.model';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

  @Get(':email')
    async findOne(@Param() params: GetUserDto): Promise<User> {
        return this.userService.findOne(params.email);
    }

  @ApiBearerAuth('access-token')
  @UseGuards(RoleGuard([Role.SUPER_ADMIN]))
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
      return this.userService.createFarmAdmin(createUserDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(RoleGuard([Role.SUPER_ADMIN, Role.FARM_ADMIN]), IsUserGuard)
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
      return this.userService.updateOne(id, updateUserDto);
  }

  @ApiBearerAuth('access-token')
  @UseGuards(RoleGuard([Role.SUPER_ADMIN, Role.FARM_ADMIN]), IsUserGuard)
  @Patch(':id/password')
  async changePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<User> {
      return this.userService.changePassword(id, changePasswordDto.password);
  }
}
