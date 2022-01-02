import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ContractRepository} from "../repositories/Contract.repository";
import {AbiItem} from "web3-utils";
import {AuthGuard} from "@nestjs/passport";

@UseGuards(AuthGuard('custom'))
@Controller('api/contract')
export class ContractController {

    constructor(private contractRepository: ContractRepository) {
    }

    @Get()
    getContracts() {
        return this.contractRepository.find()
    }

    @Get(":id")
    getContractById(@Param('id') id: number) {
        return this.contractRepository.findOne({where: {id: id}})
    }

    @Post()
    addContract(@Body() data: { address: string, abi: AbiItem[], name: string }) {
        return this.contractRepository.save(data)
    }

    @Delete("/:id")
    async deleteContract(@Param('id') id: number) {
        await this.contractRepository.delete({id: id})
    }

}
