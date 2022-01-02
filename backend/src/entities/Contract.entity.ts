import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {AbiItem} from 'web3-utils'

@Entity()
export class ContractEntity {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    address: string

    @Column({type: 'json'})
    abi: AbiItem[]

    @Column()
    name: string

}