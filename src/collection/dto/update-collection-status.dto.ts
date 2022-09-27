import { CollectionStatus } from '../utils';

export class UpdateCollectionStatusDto {
  status: CollectionStatus.APPROVED | CollectionStatus.REJECTED;
}
