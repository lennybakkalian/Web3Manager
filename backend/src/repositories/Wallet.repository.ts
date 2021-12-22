import {EntityRepository, Repository} from "typeorm";
import {WalletEntity} from "../entities/Wallet.entity";

@EntityRepository(WalletEntity)
export class WalletRepository extends Repository<WalletEntity> {

}