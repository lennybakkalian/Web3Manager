import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class AddressEntity {

    @PrimaryColumn()
    address: string

    @Column()
    name: string

}