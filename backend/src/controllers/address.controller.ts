import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {AuthGuard} from "@nestjs/passport";
import {AddressRepository} from "../repositories/Address.repository";
import {In} from "typeorm";

@UseGuards(AuthGuard('custom'))
@Controller('api/address')
export class AddressController {

    constructor(private addressRepository: AddressRepository) {
    }

    @Get()
    getAll() {
        return this.addressRepository.find()
    }

    @Post()
    getByAddresses(@Body() addresses: string[]) {
        return this.addressRepository.find({where: {address: In([...new Set(addresses)])}})
    }

    @Post(":address")
    editAddress(@Param('address') address: string, @Body() body: { name: string | null }) {
        const entity = this.addressRepository.findOneOrFail({where: {address: address}})
        if (!body.name)
            return this.addressRepository.delete({address: address}).then(res => res.affected > 0)
        return this.addressRepository.save({
            ...entity,
            name: body.name
        })
    }


}
