import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {CreateRoleDto} from "../roles/dto/create-role-dto";
import {Ganre} from "./ganres.model";
import {FileService, FileType} from "../file/file.service";
import {AddGanreDto} from "./dto/add-ganre-dto";
import {Torrent} from "../torrent/torrent.model";
import {TorrentGanres} from "./torrent-ganre.model";
import {AddGanresDto} from "./dto/add-ganres-dto";
import {async} from "rxjs";

@Injectable()
export class GanresService {
    constructor(private fileService: FileService,
                @InjectModel(Ganre) private ganreRepository: typeof Ganre,
                @InjectModel(Torrent) private torrentRepository: typeof Torrent,
                @InjectModel(TorrentGanres) private torrentGanresRepository: typeof TorrentGanres,
    ) {
    }

    async createGanre(dto: CreateRoleDto, GanreLogo) {
        let value = dto.value
        const mainGanreLogo = this.fileService.createFile(FileType.IMAGE, GanreLogo)
        const findGanre = await this.ganreRepository.findOne({where: {value}})
        if (findGanre) throw new HttpException('Такой жанр уже существует', HttpStatus.BAD_REQUEST)
        const ganre = await this.ganreRepository.create({...dto, GanreLogo: mainGanreLogo})
        return ganre;
    }

    async getGanreById(id: number) {
        const ganre = await this.ganreRepository.findByPk(id, {include: {all: true}})
        if (!ganre) throw new HttpException('Такого жанра не существует', HttpStatus.NOT_FOUND)
        return ganre
    }

    async getToorentsByIdGanre(id?: number, offset?: number, limit?: number) {
        if (!limit) limit = 10
        limit > 50 ? limit = 50 : limit
        const ganre = await this.ganreRepository.findAll({
            include: [{
                model: Torrent,
                where: {id: id}
            }],
            offset: offset,
            limit: limit,
        });
        if (!ganre) throw new HttpException('Такого жанра не существует', HttpStatus.NOT_FOUND)
        return ganre
    }

    async getAllGanres() {
        const ganres = await this.ganreRepository.findAll()
        if (ganres.length === 0) throw new HttpException('В базе данных нет жанров, создайте жанр', HttpStatus.NOT_FOUND)
        let json = JSON.stringify(ganres);
        let obj = JSON.parse(json)
        for (let i = 0; i < obj.length; i++) {
            obj[i].GanreLogo = await this.getLogoOfGanreById(obj[i].id)
        }
        console.log(obj)
        return obj
    }

    async addGanre(dto: AddGanreDto) {
        const torrent = await this.torrentRepository.findByPk(dto.torrentId, {include: {all: true}})
        if (!torrent) throw new HttpException('Торрент с таким id не найден', HttpStatus.NOT_FOUND)
        const ganre = await this.getGanreById(dto.ganreId)
        if (!ganre) throw new HttpException('Жанр с таким id не найден', HttpStatus.NOT_FOUND)
        await torrent.$add('ganres', ganre.id)
        return torrent
    }

    async addGanres(dto: AddGanresDto) {
        let arr = dto.ganresIds.split(',');
        console.log(arr)
        const torrent = await this.torrentRepository.findByPk(dto.torrentId, {include: {all: true}})
        if (!torrent) throw new HttpException('Торрент с таким id не найден', HttpStatus.NOT_FOUND)
        arr.forEach(async element => {
            const ganre = await this.getGanreById(Number(element))
            if (!ganre) throw new HttpException('Жанр с таким id не найден', HttpStatus.NOT_FOUND)
            await torrent.$add('ganres', ganre.id)
        })
        return torrent
    }

    randomInteger(min, max) {
        //if (max==1||max==0)  return 0
        // получить случайное число от (min-0.5) до (max+0.5)
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    async getLogoOfGanreById(id: number) {
        const torrents = await this.torrentGanresRepository.findAll({where: {ganreId: id}})
        let json = JSON.stringify(torrents);
        let obj = JSON.parse(json)

        const randomIndex = Math.abs(this.randomInteger(0, obj.length - 1))

        const torrentID = obj[randomIndex]
        if (!torrentID) return "жанр не назначен ни одной игре"
        console.log(torrents)
        const torrent = await this.torrentRepository.findByPk(torrentID.torrentId)
        return torrent.mainPicture
    }
}
