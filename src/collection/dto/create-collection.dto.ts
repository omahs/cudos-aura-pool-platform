import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'Collection Name' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 'My collection' })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'mydenom' })
  denom_id: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 200 })
  hashing_power: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 2 })
  royalties: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 5 })
  maintenance_fee: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'my_payout_address' })
  payout_address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 1 })
  farm_id: number;
}
