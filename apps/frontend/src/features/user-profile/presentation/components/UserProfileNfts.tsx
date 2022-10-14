import MenuItem from '@mui/material/MenuItem';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_PADDING, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import GridView from '../../../../core/presentation/components/GridView';
import Select from '../../../../core/presentation/components/Select';
import React from 'react';
import NftPreview from '../../../nfts-explore/presentation/components/NftPreview';
import UserProfilePageStore from '../stores/UserProfilePageStore';
import NftProfileEntity from '../../../nft-details/entities/NftEntity';

interface Props {
    userProfilePageStore: UserProfilePageStore;
}

export default function UserProfileNfts({ userProfilePageStore }: Props) {

    return (
        <div className={'NftModelsViewerTable'}>
            <div className={'Grid FilterHeader'}>
                <Select
                    className={'SortBySelect'}
                    onChange={userProfilePageStore.setSortByIndex}
                    value={userProfilePageStore.selectedSortIndex}
                >
                    {UserProfilePageStore.TABLE_KEYS.map(
                        (key: string, index: number) => <MenuItem key={index} value={index}>{key}</MenuItem>,
                    )}
                </Select>
                <Actions
                    layout={ACTIONS_LAYOUT.LAYOUT_ROW_RIGHT}
                    height={ACTIONS_HEIGHT.HEIGHT_48}
                >
                    {/* TODO: show all filters */}
                    <Button
                        padding={BUTTON_PADDING.PADDING_24}
                        type={BUTTON_TYPE.ROUNDED}
                    >
                All Filters
                    </Button>
                </Actions>
            </div>
            <GridView
                gridViewStore={userProfilePageStore.gridViewStore}
                defaultContent={<div className={'NoContentFound'}>No Nfts found</div>}
            >
                {userProfilePageStore.nftProfileEntities.map(
                    (nftProfileEntity: NftProfileEntity, index: number) => <NftPreview
                        key={index}
                        nftPreviewEntity={nftProfileEntity}
                        collectionEntity={userProfilePageStore.getCollectionById(nftProfileEntity.collectionId)}
                    />,
                )}
            </GridView>
        </div>
    )
}
