import {Body, Controller, Get, Param, Post} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateRoleDto} from "./dto/create-role-dto";
import {Role} from "./roles.model";

@ApiTags("Роли")
@Controller('roles')
export class RolesController {
    constructor(private rolesService: RolesService) {}

    @ApiOperation({summary: "Создание роли"})
    @ApiResponse({status:200, type:Role})
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.rolesService.createRole(dto)
    }

    @ApiOperation({summary: "Вернуть роль по имени"})
    @ApiResponse({status:200, type:Role})
    @Get('/:value')
    getByValue(@Param('value') value: string) {
        return this.rolesService.getRoleByValue(value)
    }
    @ApiOperation({summary: "Описание ролей"})
    @ApiResponse({status:200, type:[Role]})
    @Get()
    getAllRoles() {
        return this.rolesService.getAllRoles()
    }
}
