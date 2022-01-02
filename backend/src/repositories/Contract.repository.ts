import {EntityRepository, Repository} from "typeorm";
import {ContractEntity} from "../entities/Contract.entity";

@EntityRepository(ContractEntity)
export class ContractRepository extends Repository<ContractEntity> {

}