import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersModule} from "../users/users.module";
import {JwtModule} from "@nestjs/jwt";
import {FileService} from "../file/file.service";

@Module({
  providers: [AuthService, FileService],
  controllers: [AuthController],
  imports: [JwtModule.register({
    secret: process.env.PRIVATE_KEY || "SECRET",
    signOptions: {expiresIn: '24h'},
  }),
    UsersModule],
})
export class AuthModule {}
