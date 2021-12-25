import {EntityRepository, Repository} from "typeorm";
import {AddressEntity} from "../entities/Address.entity";

@EntityRepository(AddressEntity)
export class AddressRepository extends Repository<AddressEntity> {

}