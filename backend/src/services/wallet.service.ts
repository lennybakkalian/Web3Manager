import {Injectable} from '@nestjs/common';
import {HttpService} from "@nestjs/axios";
import {IWallet} from "@shared";
import {WalletRepository} from "../repositories/Wallet.repository";

@Injectable()
export class WalletService {

    constructor(private http: HttpService,
                private walletRepository: WalletRepository) {
    }

    saveWallet = (wallet: IWallet) => this.walletRepository.save(wallet)


}
