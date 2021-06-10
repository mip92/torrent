import {Body, Controller, Get, Param, Post, Put, Query} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {UsersService} from "./users.service";
import {User} from "./user.model";
import {CreateUserDto} from "./dto/create-user-dto";
import {CreateAdminDto} from "./dto/create-admin-dto";
import {PaginationParams} from "./dto/pagination-dto";

@ApiTags("Пользователи")
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: "Создание пользователя"})
    @ApiResponse({status: 200, type: User})
    @Post()
    createUser(@Body() dto: CreateUserDto, userAvatar) {
        return this.usersService.createUser(dto, userAvatar)
    }

    @ApiOperation({summary: "Замена роли пользователя на администратора"})
    @ApiResponse({status: 200, type: User})
    @Put()
    createAdmin(@Body() dto: CreateAdminDto) {
        return this.usersService.createAdmin(dto)
    }

    @ApiOperation({summary: "Получить всех пользователей"})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    async GetAllUsers(@Query("offset") offset: number,
                      @Query("limit") limit: number){
        //http://localhost:5000/users?offset=0&limit=10
        return this.usersService.GetAllUsers(offset, limit);
    }


    @ApiOperation({summary: "Получить пользователя по email"})
    @ApiResponse({status: 200, type: User})
    @Get('/:email')
    getUserByEmail(@Param('email') email: string) {
        return this.usersService.getUserByEmail(email)
    }

}
