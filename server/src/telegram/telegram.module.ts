import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import {MongooseModule} from '@nestjs/mongoose'
import { UserSchema } from './schemas/user.schema';
import { TelegramController } from './telegram.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[MongooseModule.forFeature([{name:"User",schema:UserSchema}]),
  JwtModule.register({
    secret:"secret",
    signOptions: {
      expiresIn: '1d'
    }
  })
],
  providers: [TelegramService],
  controllers: [TelegramController]
})
export class TelegramModule {}
