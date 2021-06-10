import {Body, Controller, Get, HttpException, HttpStatus, Post, UploadedFiles, UseInterceptors} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user-dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {CreateEmailDto} from "../users/dto/create-email-dto";
import {CreatePasswordDto} from "../users/dto/create-password-dto";

@ApiTags("Регистрация и Авторизация")
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: "Регистрация пользователя"})
    @ApiResponse({status: 200, type: 'string'})
    @Post('registration')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'avatar', maxCount: 1},
    ]))
    registration(@UploadedFiles() file, @Body() dto: CreateUserDto) {
        const {avatar} = file
        if (!avatar) throw new HttpException('Нет аватарки', HttpStatus.NOT_FOUND)
        return this.authService.registration(dto, avatar[0])
    }

    @ApiOperation({summary: "Валидация почты"})
    @ApiResponse({status: 200, type: 'string'})
    @Post('findEmail')
    findEmail(@Body() dto:CreateEmailDto){
        return this.authService.findEmail(dto.email)
    }
    @ApiOperation({summary: "Валидация пароля"})
    @ApiResponse({status: 200, type: 'string'})
    @Post('isPasswordMatch')
    isPasswordMatch(@Body() dto:CreatePasswordDto){
        return this.authService.isPasswordMatch(dto)
    }

    @ApiOperation({summary: "Валидация автарки"})
    @ApiResponse({status: 200, type: 'string'})
    @Post('isAvatarAPicture')
    @UseInterceptors(FileFieldsInterceptor([
        {name: 'avatar', maxCount: 1},
    ]))
    isAvatarAPicture(@UploadedFiles() file){
        const {avatar} = file
        if (!avatar) throw new HttpException('Нет аватарки', HttpStatus.NOT_FOUND)
        return this.authService.isAvatarAPicture(avatar[0])
    }


    @ApiOperation({summary: "Авторизация пользователя"})
    @ApiResponse({status: 200, type: 'string'})
    @Post('login')
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto)
    }
}
