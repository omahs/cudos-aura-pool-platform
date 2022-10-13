import { action, makeAutoObservable, makeObservable, observable } from 'mobx';
import { KeplrWallet, SigningStargateClient } from 'cudosjs';
import S from '../../../../core/utilities/Main';
import { CHAIN_DETAILS } from '../../../../core/utilities/Constants';
import BigNumber from 'bignumber.js';

declare let Config;

export default class WalletStore {

    keplrWallet: KeplrWallet;
    balance: BigNumber;

    constructor() {
        this.keplrWallet = null;
        this.balance = null;

        makeAutoObservable(this);
    }

    @action
    async connectKeplr(chosenNetwork: string): Promise<void> {
        this.keplrWallet = new KeplrWallet({
            CHAIN_ID: CHAIN_DETAILS.CHAIN_ID[chosenNetwork],
            CHAIN_NAME: CHAIN_DETAILS.CHAIN_NAME[chosenNetwork],
            RPC: CHAIN_DETAILS.RPC_ADDRESS[chosenNetwork],
            API: CHAIN_DETAILS.API_ADDRESS[chosenNetwork],
            STAKING: CHAIN_DETAILS.STAKING_URL[chosenNetwork],
            GAS_PRICE: CHAIN_DETAILS.GAS_PRICE.toString(),
        });

        makeObservable(this.keplrWallet, {
            'connected': observable,
            'accountAddress': observable,
            'connect': action,
        });

        this.keplrWallet.addAddressChangeCallback(this.onChangeAccount);

        await this.keplrWallet.connect();
        sessionStorage.setItem('keplrWallet', S.Strings.TRUE);
        // await this.keplrWallet.getBalance();

    }

    async disconnectKeplr(): Promise<void> {
        await this.keplrWallet.disconnect();
        sessionStorage.removeItem('keplrWallet');
    }

    async tryConnectKeplr(): Promise<void> {
        const connectedInSession = sessionStorage.getItem('keplrWallet');
        if (connectedInSession !== null) {
            await this.keplrWallet.connect();
        }
    }

    isKeplrConnected(): boolean {
        return this.keplrWallet !== null && this.keplrWallet.isConnected();
    }

    onClickToggleKeplr = async () => {
        if (this.isKeplrConnected() === true) {
            await this.disconnectKeplr();
        } else {
            await this.connectKeplr('PRIVATE');
        }
    }

    onChangeAccount = () => {
        window.location.reload();
    }

    async getSignerData() {
        const signer = this.keplrWallet.offlineSigner;
        const sender = this.keplrWallet.accountAddress;
        const client = await SigningStargateClient.connectWithSigner(Config.CUDOS_NETWORK.RPC, signer);

        return { signer, sender, client };
    }

    getKeplrAddress(): string {
        return this.keplrWallet.accountAddress;
    }

    getBalance(): string {
        // return this.balance.toFixed();
        return '12000'
    }
}
