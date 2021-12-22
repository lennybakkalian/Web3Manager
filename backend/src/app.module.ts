import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {HttpModule} from "@nestjs/axios";
import {ScheduleModule} from "@nestjs/schedule";
import { WalletService } from './services/wallet.service';
import { WalletController } from './controllers/wallet.controller';
import {WalletRepository} from "./repositories/Wallet.repository";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DB_HOST ?? 'localhost',
            port: 9900,
            username: 'w3m',
            password: 'w3m',
            database: 'w3m',
            autoLoadEntities: true,
            //entities: ["dist/**/*.entity.{js,ts}"],
            synchronize: true
        }),
        TypeOrmModule.forFeature([
           WalletRepository
        ]),
        ScheduleModule.forRoot(),
        HttpModule,
    ],
    controllers: [AppController, WalletController],
    providers: [AppService, WalletService],
})
export class AppModule {
}
