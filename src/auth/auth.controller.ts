import { Controller, Post, Body, Request, UseGuards, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('register')  // URL: /auth/register
    async register(
        @Body() createUserDto: { nome: string, email: string, senha: string }
    ) {
        return this.authService.register(createUserDto);
    }

    @Post('login')  // URL: /auth/login
    async login(
        @Body() loginDto: { email: string, senha: string, }
    ) {
        return this.authService.login(loginDto);
    }

    @Post('change-password')
    @UseGuards(JwtAuthGuard)
    async changePassword(
        @Body() changePasswordDto: { oldPassword: string, newPassword: string },
        @Request() req,
    ) {
        const userId = req.user.id;
        return this.authService.changePassword(userId, changePasswordDto.oldPassword, changePasswordDto.newPassword);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete/:id')  // A URL será: /auth/delete/{id}
    async deleteUser(@Param('id') id: string) {
        return this.authService.deleteUser(Number(id));
    }


}
