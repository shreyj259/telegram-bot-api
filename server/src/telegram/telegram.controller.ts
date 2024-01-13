import { Body, Controller,Get,Patch,Post, UseGuards } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Controller('telegram')
export class TelegramController {
    constructor(private telegramService:TelegramService){}
    
    @Get()
    async getAllUsers(){
        return this.telegramService.fetchAllUsers()
    }

    @Post('ban')        
    async banUser(
        @Body('userId') userId:string,
    ){
            return this.telegramService.blockUser(userId)
    }

    @Post('unban')        
    async unbanUser(
        @Body('userId') userId:string,
    ){
            return this.telegramService.unBlockUser(userId)
    }    

    @Post('remove')
    async removeUser(
        @Body('userId') userId:string,
    ){
        return this.telegramService.removeUser(userId)
    }

}
