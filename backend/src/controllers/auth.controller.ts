import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "../services/auth.service";

@Controller('api/auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @Post('login')
    checkKey(@Body() body: { key: string }) {
        return this.authService.auth(body.key)
    }

}
