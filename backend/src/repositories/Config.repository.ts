import {EntityRepository, Repository} from "typeorm";
import {ConfigEntity} from "../entities/Config.entity";

@EntityRepository(ConfigEntity)
export class ConfigRepository extends Repository<ConfigEntity> {
    findByConfigKey = (configKey: string) => this.findOne({where: {configKey: configKey}})
}