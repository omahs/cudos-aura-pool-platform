import CollectionProfile from '../../../collections-marketplace/entities/CollectionProfile';
import MiningFarmModel from '../../../mining-farm/entities/MiningFarmModel';
import NftPreviewModel from '../../entities/NftPreviewModel';
import NftProfile from '../../../nft-details/entities/NftProfile';

export default interface NftRepo {

    getNftsByOwnerAddressSortedPaginated(
        ownerAddress: string,
        sortKey: string,
        start: number,
        size: number,
        callback: (nftPreviews: NftPreviewModel[], total: number) => void,
    );

    getNftsByCategoryAndSearchSortedPaginated(
        collectionId: string,
        search: string,
        category: string,
        sortKey: string,
        start: number,
        size: number,
        callback: (nftPreviews: NftPreviewModel[], total: number) => void,
    );

    getNftProfile(
        nftId: string,
        callback: (nftProfile: NftProfile, collectionProfile: CollectionProfile, farmView: MiningFarmModel) => void);
}
