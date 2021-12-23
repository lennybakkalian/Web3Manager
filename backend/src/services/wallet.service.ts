import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {WalletRepository} from "../repositories/Wallet.repository";
import {IWallet} from "../dto/IWallet";

@Injectable()
export class WalletService {

    constructor(private http: HttpService,
                private walletRepository: WalletRepository) {
    }

    saveWallet = (wallet: IWallet) => this.walletRepository.save(wallet)


}
