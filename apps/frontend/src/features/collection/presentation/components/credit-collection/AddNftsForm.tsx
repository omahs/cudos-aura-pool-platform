import RepoStore from '../../../../../core/presentation/stores/RepoStore';
import AccountSessionStore from '../../../../accounts/presentation/stores/AccountSessionStore';
import { observer } from 'mobx-react';
import React from 'react';
import CollectionEntity from '../../../entities/CollectionEntity';
import AddNftsToCollectionStepState from '../../stores/AddNftsToCollectionPageState copy';
import '../../styles/add-nfts-form.css';

type Props = {
    navSteps: {stepNumber: number, stepName: string}[];
    collectionEntity: CollectionEntity;
    accountSessionStore: AccountSessionStore;
}
function AddNftsForm({ navSteps, collectionEntity }: Props) {
    // const [addNftsToCollectionStepState] = new AddNftsToCollectionStepState(collectionEntity, repoStore, accountSessionStore);

    // return (
    //     <div className={'AddNftsForm'} >
    //         {addNftsToCollectionPageState.isCollectionEditable() === false && (<CollectionNotEditableContent/>)}
    //         {addNftsToCollectionPageState.isCollectionEditable() === true && (
    //             <div className={'NftAddContainer FlexRow'}>
    //                 <div className={'NftAddForm FlexColumn'}>

    //                 </div>
    //             </div>
    //         )}
    //     </div>
    // )

    // function CollectionNotEditableContent() {
    //     return (<div className={'NotEditableContent'}>
    //         Collection is either not yours or is already approved. You can't add NFTs to it.
    //     </div>)
    // }
}

export default (observer(AddNftsForm));
