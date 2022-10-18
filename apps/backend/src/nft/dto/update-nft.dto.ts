import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUrl, IsDate, IsDateString } from 'class-validator';

export class UpdateNFTDto {

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'The new coolest NFT' })
        name: string;

    @IsUrl()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'url' })
        uri: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 'data' })
        data: string;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 200 })
        hashing_power: number;

    @IsNumber()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: 1000 })
        price: number;

    @IsDateString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ example: '2022-10-17T13:25:19.503Z' })
        expiration_date: Date;
}
