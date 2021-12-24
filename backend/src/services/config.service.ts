import {Injectable, OnModuleInit} from '@nestjs/common';
import {ConfigRepository} from "../repositories/Config.repository";

@Injectable()
export class ConfigService implements OnModuleInit {

    private readonly DEFAULT_CONFIG = {
        BSC_SCAN_API_KEY: null
    }


    constructor(private configRepository: ConfigRepository) {
    }

    async onModuleInit() {
        let configEntity = await this.configRepository.findByConfigKey('core')
        const config = configEntity ? {...this.DEFAULT_CONFIG, ...JSON.parse(configEntity.configValue)} : this.DEFAULT_CONFIG
        await this.configRepository.save({
            configKey: 'core',
            configValue: JSON.stringify(config)
        })

    }

}
