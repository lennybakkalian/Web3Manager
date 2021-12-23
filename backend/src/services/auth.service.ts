import {Injectable, Logger, OnModuleInit} from '@nestjs/common';
import {ConfigRepository} from "../repositories/Config.repository";
import * as crypto from "crypto";
import {PassportStrategy} from "@nestjs/passport";
import {Strategy} from "passport-custom";
import {Request} from "express";

@Injectable()
export class AuthService extends PassportStrategy(Strategy) implements OnModuleInit {

    private readonly logger = new Logger(AuthService.name)

    private authKey: string

    constructor(private configRepository: ConfigRepository) {
        super()
    }

    onModuleInit() {
        this.configRepository.findByConfigKey('auth_key').then(async res => {
            if (res) {
                this.authKey = res.configValue
            } else {
                this.authKey = crypto.randomBytes(32).toString('hex')
                await this.configRepository.save({configKey: 'auth_key', configValue: this.authKey})
            }
            this.logger.log('\n' + '#'.repeat(40) + `\nAuth key: ${this.authKey}\n` + '#'.repeat(40))
        })
    }

    auth = (key: string) => this.authKey && this.authKey == key

    async validate(req: Request) {
        return this.auth(req.cookies['w3m.key'])
    }
}
