import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user-dto";
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./user.model";
import {RolesService} from "../roles/roles.service";
import {CreateAdminDto} from "./dto/create-admin-dto";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {
    }

    async createUser(dto: CreateUserDto, userAvatar:string) {
        const role = await this.roleService.getRoleByValue("user")
        console.log(userAvatar)
        const user = await this.userRepository.create({...dto, userAvatar: userAvatar})
        await user.$set('role', role.id)
        //await user.$set('userAvatar', userAvatar)
        console.log(userAvatar)
        user.role = role
        user.userAvatar=userAvatar
        return user
    }
    async createAdmin(dto: CreateAdminDto) {
        let email=dto.email
        const role = await this.roleService.getRoleByValue("admin")
        const user = await this.userRepository.findOne({where:{email}})
        await user.$set('role', role.id)
        user.role = role
        return user
    }

    async GetAllUsers(offset?: number, limit?: number) {
        if(!limit) limit=10
        limit>50 ? limit=50:limit
        try {
            const items = await this.userRepository.findAll({

                limit: limit,
                offset: offset,
                where: {}
            });
            return items
        }catch (e) {
            console.log(e)
            throw new HttpException('Произошла ошибка', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({where: {email}, include: {all: true}})
        return user
    }
}
