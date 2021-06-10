import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role-dto";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository: typeof Role) {}
    async createRole(dto: CreateRoleDto) {
        let value =dto.value
        const findRole = await this.roleRepository.findOne({where:{value}})
        if (findRole) throw new HttpException('Такая роль уже существует', HttpStatus.BAD_REQUEST)
        const role = await this.roleRepository.create(dto)
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({where:{value}})
        if (!role) throw new HttpException('Такой роли не существует', HttpStatus.NOT_FOUND)
        return role
    }
    async getAllRoles() {
        const roles = await this.roleRepository.findAll()
        if (roles.length===0) throw new HttpException('В базе данных нет ролей, создайте роль', HttpStatus.NOT_FOUND)
        return roles
    }
}
