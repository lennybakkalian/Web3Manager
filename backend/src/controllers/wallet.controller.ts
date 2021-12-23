import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {WalletService} from "../services/wallet.service";
import {WalletRepository} from "../repositories/Wallet.repository";
import {AuthGuard} from "@nestjs/passport";
import {IWallet} from "../dto/IWallet";

@UseGuards(AuthGuard('custom'))
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


    @Post(":id")
    async update(@Param('id') id: number, @Body() body: { name: string }) {
        await this.walletRepository.save({...await this.walletRepository.findOneOrFail({where: {id: id}}), ...body})
    }

}
