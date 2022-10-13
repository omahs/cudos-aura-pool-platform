export const enum NftStatus {
    QUEUED = 'queued',
    APPROVED = 'approved',
    REJECTED = 'rejected',
    EXPIRED = 'expired',
    DELETED = 'deleted',
    MINTED = 'minted',
}

export type NftFilters = {
    limit: number;
    creator_id: number;
    collection_id: number;
    status: NftStatus;
};

export type MarketplaceNftFilters = {
    denom_ids: string[];
    tx_hash: string;
};
