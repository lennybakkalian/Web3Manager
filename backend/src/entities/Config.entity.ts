import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity({name: 'config'})
export class ConfigEntity {

    @PrimaryColumn()
    configKey: string

    @Column()
    configValue: string
}