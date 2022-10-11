/* global TR */

import React from 'react';
import { inject, observer } from 'mobx-react';

import AlertStore from '../../../common/js/stores/AlertStore';
import PopupConnectWalletsStore from '../../../common/js/stores/PopupConnectWalletsStore';

import PageComponent from '../../../common/js/components-pages/PageComponent';
import ContextPageComponent, { ContextPageComponentProps } from './common/ContextPageComponent';
import PageHeader from '../components-inc/PageHeader';
import PageFooter from '../components-inc/PageFooter';
import ExploreCollectionsStore from '../../../common/js/stores/ExploreCollectionsStore';

import S from '../../../common/js/utilities/Main';

import SvgSearch from '../../../common/svg/search.svg';

import './../../css/components-pages/page-explore-collections-component.css';
import Input, { InputType } from '../../../common/js/components-inc/Input';
import { InputAdornment } from '@material-ui/core';
import TopCollections from '../components-inc/TopCollections';
import Button from '../../../common/js/components-inc/Button';
import Actions from '../../../common/js/components-inc/Actions';

interface Props extends ContextPageComponentProps {
    alertStore: AlertStore,
    popupConnectWalletsStore: PopupConnectWalletsStore,
    exploreCollectionsStore: ExploreCollectionsStore
}

interface State {
}

export default class ExploreCollectionsPageComponent extends ContextPageComponent<Props, State> {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount(): void {
        super.componentDidMount();

        this.props.exploreCollectionsStore.innitialLoad();
    }

    static layout() {
        const MobXComponent = inject('appStore', 'alertStore', 'walletStore', 'exploreCollectionsStore')(observer(ExploreCollectionsPageComponent));
        PageComponent.layout(<MobXComponent />);
    }

    getPageLayoutComponentCssClassName() {
        return 'PageExploreCollections';
    }

    renderContent() {
        const store = this.props.exploreCollectionsStore;
        return (
            <>
                <div className={'PageContent'} >
                    <PageHeader />
                    <div className={'ExploreColelctions FlexColumn'}>
                        <div className={'PageHeading Heading1'}>Explore NFT Collections</div>
                        <Input
                            inputType={InputType.TEXT}
                            className={'SearchBar'}
                            value = {store.searchString}
                            onChange = { store.changeSearchString }
                            placeholder = {'Search Collections, Farms and accounts'}
                            InputProps={{
                                startAdornment: <InputAdornment position="start" >
                                    <div className={'SVG Icon'} dangerouslySetInnerHTML={{ __html: SvgSearch }}/>
                                </InputAdornment>,
                            }}
                        />
                        <div className={'CategoriesRow FlexRow'}>
                            {store.categories.map((category, index) => <div
                                key={index}
                                onClick={() => store.selectCategory(index)}
                                className={`CategoryName Pointer ${S.CSS.getActiveClassName(store.selectedCategoryIndex === index)}`}
                            >
                                {category}
                            </div>)
                            }
                        </div>
                    </div>
                    <Actions
                        layout={Actions.LAYOUT_ROW_CENTER}
                        height={Actions.HEIGHT_48}
                    >
                        {/* TODO: redirect */}
                        <Button
                            padding={Button.PADDING_24}
                            type={Button.TYPE_ROUNDED}
                        >
                            See All NFTs
                        </Button>
                    </Actions>
                    <TopCollections
                        selectedTopCollectionPeriod={store.selectedTopCollectionPeriod}
                        cudosPriceChangeDisplay={store.cudosPriceChangeDisplay()}
                        cudosPriceUsd={store.cudosPrice}
                        topCollectionPreviews={store.topCollectionPreviews}
                        changeTopCollectionPeriod={store.changeTopCollectionPeriod}
                    />
                    <Actions
                        layout={Actions.LAYOUT_ROW_CENTER}
                        height={Actions.HEIGHT_48}
                    >
                        {/* TODO: redirect */}
                        <Button
                            padding={Button.PADDING_24}
                            type={Button.TYPE_ROUNDED}
                        >
                            See All Collections
                        </Button>
                    </Actions>
                    <PageFooter />
                </div>
            </>
        )
    }
}
