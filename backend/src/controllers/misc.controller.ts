import {Body, Controller, Get, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport"
import {ConfigRepository} from "../repositories/Config.repository";

@UseGuards(AuthGuard('custom'))
@Controller('api')
export class MiscController {

    constructor(private configRepository: ConfigRepository) {
    }

    @Get('config')
    async getConfig() {
        return JSON.parse((await this.configRepository.findByConfigKey('core')).configValue)
    }

    @Post('config')
    setConfig(@Body() config: any) {
        return this.configRepository.save({
            configKey: 'core',
            configValue: JSON.stringify(config)
        }).then(res => JSON.parse(res.configValue))
    }

}
