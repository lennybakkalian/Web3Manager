import {Module} from '@nestjs/common';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {HttpModule} from "@nestjs/axios";
import {ScheduleModule} from "@nestjs/schedule";
import {WalletService} from './services/wallet.service';
import {WalletController} from './controllers/wallet.controller';
import {WalletRepository} from "./repositories/Wallet.repository";
import {ConfigRepository} from "./repositories/Config.repository";
import {AuthService} from "./services/auth.service";
import {AuthController} from "./controllers/auth.controller";
import {PassportModule} from "@nestjs/passport";
import {ConfigService} from './services/config.service';
import {MiscController} from './controllers/misc.controller';
import {AddressRepository} from "./repositories/Address.repository";
import {AddressController} from './controllers/address.controller';
import {ContractController} from './controllers/contract.controller';
import {ContractRepository} from "./repositories/Contract.repository";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST ?? 'localhost',
            port: 5432,
            username: 'w3m',
            password: 'w3m',
            database: 'w3m',
            autoLoadEntities: true,
            //entities: ["dist/**/*.entity.{js,ts}"],
            synchronize: true
        }),
        TypeOrmModule.forFeature([
            WalletRepository,
            ConfigRepository,
            AddressRepository,
            ContractRepository
        ]),
        ScheduleModule.forRoot(),
        PassportModule.register({defaultStrategy: 'custom'}),
        HttpModule
    ],
    controllers: [WalletController, AuthController, MiscController, AddressController, ContractController],
    providers: [
        AppService,
        WalletService,
        AuthService,
        ConfigService
    ],
})
export class AppModule {
}
