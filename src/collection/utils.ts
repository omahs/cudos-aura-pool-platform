export const enum CollectionStatus {
  QUEUED = 'queued',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  ISSUED = 'issued',
  DELETED = 'deleted',
}

export type CollectionFilters = {
  denom_id: string;
  creator_id: number;
  status: CollectionStatus;
};

export type MarketplaceCollectionFilters = {
  denom_id: string;
};
