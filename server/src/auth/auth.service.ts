import {HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user-dto";
import {UsersService} from "../users/users.service";
import * as bcrypt from "bcrypt"
import {User} from "../users/user.model";
import {JwtService} from "@nestjs/jwt";
import {FileService, FileType} from "../file/file.service";
import {CreatePasswordDto} from "../users/dto/create-password-dto";
import {log} from "util";

@Injectable()
export class AuthService {
    constructor(private userService: UsersService,
                private fileService: FileService,
                private jwtService: JwtService) {
    }
    async registration(dto: CreateUserDto, avatar) {

        const candidate = await this.userService.getUserByEmail(dto.email)
        if (candidate) {
            throw new HttpException('Пользователь с таким email уже существует', HttpStatus.BAD_REQUEST)
        }
        const userAvatar= this.fileService.createFile(FileType.IMAGE, avatar)
        const hashPassword = await bcrypt.hash(dto.password, 5)
        const email=dto.email
        const user = await this.userService.createUser({email, password: hashPassword}, userAvatar)
        return this.generateToken(user)
    }

    private generateToken(user: User) {
        console.log(user)
        const payload = {email: user.email, id: user.id, role: user.role.value}
        return this.jwtService.sign(payload)
    }

    async login(dto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(dto.email);
        if (!user) throw new HttpException('Такого пользователя не существует', HttpStatus.BAD_REQUEST)
        const passwordEqual = await bcrypt.compare(dto.password, user.password)
        if (!passwordEqual) throw new HttpException('Пароль неверный', HttpStatus.BAD_REQUEST)/*throw new UnauthorizedException({message:'Некоректный пароль или почта'})*/
        return this.generateToken(user)
    }

    async findEmail(email: string) {
        const user = await this.userService.getUserByEmail(email);
        if (user) throw new HttpException({message: "Пользователь с таким email уже существует"}, HttpStatus.BAD_REQUEST)
        else return email
    }

    async isPasswordMatch(dto: CreatePasswordDto) {
        if (dto.password1 !== dto.password2) throw new HttpException({message: ["Пароли не совпадают"]}, HttpStatus.BAD_REQUEST)
        else return dto.password1
    }
    async isAvatarAPicture(avatar) {
        const fileExtension=avatar.originalname.split('.').pop()
        const arr=['jpeg','JPEG','jpg','JPG','png','PNG','BMP','bmp','GIF','gif', 'ico','ICO']
        let isOk=null
        for (let i=0;i<arr.length;i++){
            if (fileExtension==arr[i]) isOk="ok"
        }
        if (isOk==null){throw new HttpException({message: ["Выбранный файл не является картинкой"]}, HttpStatus.BAD_REQUEST)}
        if (avatar.size>2097152) {throw new HttpException({message: ["Размер выбранного файла больше 2 Мб"]}, HttpStatus.BAD_REQUEST)}
        else return avatar
    }
}
