import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {WalletService} from "../services/wallet.service";
import {WalletRepository} from "../repositories/Wallet.repository";
import {IWallet} from "@shared";

@Controller('api/wallet')
export class WalletController {

    constructor(private walletService: WalletService,
                private walletRepository: WalletRepository) {
    }

    @Get()
    getAll() {
        return this.walletRepository.find()
    }

    @Post()
    save(@Body() wallet: IWallet) {
        return this.walletService.saveWallet(wallet)
    }

    @Delete(":id")
    delete(@Param('id') id: number) {
        return this.walletRepository.delete({id: id}).then(r => r.affected > 0)
    }

}
