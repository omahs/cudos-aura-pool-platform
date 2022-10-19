/* global TR */

import React, { useEffect, useState } from 'react';
import { inject, observer } from 'mobx-react';
import { useNavigate, useParams } from 'react-router-dom';

import ProjectUtils from '../../../../core/utilities/ProjectUtils';
import AppRoutes from '../../../app-routes/entities/AppRoutes';
import NftEntity from '../../../nft/entities/NftEntity';
import NftFilterModel from '../../../nft/utilities/NftFilterModel';

import { MenuItem } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import ProfileHeader from '../components/ProfileHeader';
import Breadcrumbs from '../../../../core/presentation/components/Breadcrumbs';
import PageLayoutComponent from '../../../../core/presentation/components/PageLayoutComponent';
import Svg from '../../../../core/presentation/components/Svg';
import PageHeader from '../../../header/presentation/components/PageHeader';
import PageFooter from '../../../footer/presentation/components/PageFooter';
import LoadingIndicator from '../../../../core/presentation/components/LoadingIndicator';
import Select from '../../../../core/presentation/components/Select';
import Actions, { ACTIONS_HEIGHT, ACTIONS_LAYOUT } from '../../../../core/presentation/components/Actions';
import Button, { BUTTON_PADDING, BUTTON_RADIUS, BUTTON_TYPE } from '../../../../core/presentation/components/Button';
import GridView from '../../../../core/presentation/components/GridView';
import NftPreview from '../../../nft/presentation/components/NftPreview';
import AddIcon from '@mui/icons-material/Add';
import '../styles/page-add-nfts-to-collections.css';
import AccountSessionStore from '../../../accounts/presentation/stores/AccountSessionStore';
import { CollectionStatus } from '../../entities/CollectionEntity';
import AddNftsToCollectionPageState from '../stores/AddNftsToCollectionPageState';
import AppStore from '../../../../core/presentation/stores/AppStore';
import RepoStore from 'apps/frontend/src/core/presentation/stores/RepoStore';

type Props = {
    accountSessionStore?: AccountSessionStore
    appStore?: AppStore
    repoStore?: RepoStore
}

function AddNftsToCollectionPage({ appStore, accountSessionStore, repoStore }: Props) {

    const { collectionId } = useParams();
    const [addNftsToCollectionPageState] = useState(new AddNftsToCollectionPageState(repoStore, accountSessionStore));
    const navigate = useNavigate();

    useEffect(() => {
        appStore.useLoading(async () => {
            await addNftsToCollectionPageState.init(collectionId);
        })
    }, []);

    // TODO: get crumbs from router
    const crumbs = [
        { name: 'My Collections', onClick: () => { navigate(AppRoutes.USER_PROFILE) } },
        { name: 'Create Collection' },
    ]

    return (
        <PageLayoutComponent
            className = { 'PageCollectionView' }>
            <PageHeader />
            <Breadcrumbs crumbs={crumbs} />
            <div className={'PageContent AppContent'} >
                {addNftsToCollectionPageState.isCollectionEditable() === false && (<CollectionNotEditableContent/>)}
                {addNftsToCollectionPageState.isCollectionEditable() === true && (
                    <div className={'NftAddContainer FlexRow'}>

                    </div>
                )}
            </div>
            <PageFooter />
        </PageLayoutComponent>

    )

    function CollectionNotEditableContent() {
        return (<div className={'NotEditableContent'}>
            Collection is either not yours or is already approved. You can't add NFTs to it.
        </div>)
    }
}

export default inject((stores) => stores)(observer(AddNftsToCollectionPage));
