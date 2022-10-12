import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFarmDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'Farm Name' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false, example: 'My farmy farm for farming' })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'sub_account_name' })
  sub_account_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'Somewhere' })
  location: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    required: true,
    example: 'address_for_receiving_rewards_from_pool',
  })
  address_for_receiving_rewards_from_pool: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'leftover_reward_payout_address' })
  leftover_reward_payout_address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 'maintenance_fee_payout_address' })
  maintenance_fee_payout_address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ required: true, example: 20 })
  maintenance_fee_in_btc: number;
}
