import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export const enum CollectionStatus {
    QUEUED = 'queued',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    ISSUED = 'issued',
    DELETED = 'deleted',
}

export class CollectionFilters {
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
        denom_id: string;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: false })
        creator_id: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
        status: CollectionStatus;
}

export type MarketplaceCollectionFilters = {
    denom_id: string;
};
