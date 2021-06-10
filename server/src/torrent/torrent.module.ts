import {Module} from "@nestjs/common";
import {TorrentController} from "./torrent.controller";
import {TorrentService} from "./torrent.service";
import {FileService} from "../file/file.service";
import {SequelizeModule} from "@nestjs/sequelize";
import {Torrent} from "./torrent.model";
import {CommentsUsers} from "../comments/comments-users.model";
import {Ganre} from "../ganres/ganres.model";
import {TorrentGanres} from "../ganres/torrent-ganre.model";
import {GanresService} from "../ganres/ganres.service";

@Module({
        imports: [
            SequelizeModule.forFeature([Torrent, CommentsUsers, Ganre, TorrentGanres,
            ]),
        ],
        controllers: [TorrentController],
        providers: [TorrentService, FileService],
    exports:[TorrentService]
    }
)
export class TorrentModule {
}