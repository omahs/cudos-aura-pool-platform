import S from '../../../../core/utilities/Main';
import { action, makeObservable, observable } from 'mobx';
import ModalStore from '../../../../core/presentation/stores/ModalStore';
import MiningFarmEntity from '../../entities/MiningFarmEntity';
import ImageEntity, { PictureType } from '../../../upload-file/entities/ImageEntity';
import RepoStore from 'apps/frontend/src/core/presentation/stores/RepoStore';

export default class EditMiningFarmModalStore extends ModalStore {
    repoStore: RepoStore;

    @observable miningFarmEntity: MiningFarmEntity;
    @observable coverImage: ImageEntity;
    @observable profileImage: ImageEntity;

    constructor(repoStore: RepoStore) {
        super();

        this.repoStore = repoStore;

        this.miningFarmEntity = null;
        this.coverImage = null;
        this.profileImage = null;

        makeObservable(this);
    }

    nullateValues() {
        this.miningFarmEntity = null;
    }

    @action
    showSignal(miningFarmEntity: MiningFarmEntity) {
        this.miningFarmEntity = miningFarmEntity;
        this.coverImage = new ImageEntity();
        this.coverImage.base64 = miningFarmEntity.coverImgUrl;
        this.profileImage = new ImageEntity();
        this.profileImage.base64 = miningFarmEntity.profileImgUrl;

        this.show();
    }

    hide = () => {
        this.nullateValues();

        super.hide();
    }

    changeMiningFarmName = (name: string) => {
        this.miningFarmEntity.name = name;
    }

    changeMiningFarmDescription = (description: string) => {
        this.miningFarmEntity.description = description;
    }

    changeCoverImage(base64File: string) {
        this.coverImage = ImageEntity.new(base64File, PictureType.FARM_COVER);
    }

    changeProfileImage(base64File: string) {
        this.profileImage = ImageEntity.new(base64File, PictureType.FARM_PROFILE);
    }

    executeMiningFarmEditEdit() {
        // save images if new ones are selected
        if (this.profileImage.base64 !== this.miningFarmEntity.profileImgUrl) {
            // TODO: save iamge
        }

        if (this.coverImage.base64 !== this.miningFarmEntity.coverImgUrl && this.coverImage.base64 !== S.Strings.EMPTY) {
            // TODO: save iamge
        }

        // TODO: change image ids if decided so
        this.miningFarmEntity.coverImgUrl = this.coverImage.base64;
        this.miningFarmEntity.profileImgUrl = this.profileImage.base64;

        this.repoStore.miningFarmRepo.creditMiningFarm(this.miningFarmEntity);
    }
}
