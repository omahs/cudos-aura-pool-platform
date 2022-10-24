import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class UpdateFarmDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'New Name' })
        name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'New Description' })
        description: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'New Sub account name' })
        sub_account_name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'New Location' })
        location: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({

        example: 'New address_for_receiving_rewards_from_pool',
    })
        address_for_receiving_rewards_from_pool: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'New leftover_reward_payout_address' })
        leftover_reward_payout_address: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'New maintenance_fee_payout_address' })
        maintenance_fee_payout_address: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 0.0001 })
        maintenance_fee_in_btc: number;
}
