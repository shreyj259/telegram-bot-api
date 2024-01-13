import { Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import mongoose from 'mongoose';
import { User } from './schemas/user.schema';
import axios from 'axios';
const TelegramBot = require('node-telegram-bot-api');

@Injectable()
export class TelegramService {
    private readonly bot;
    constructor(
        @InjectModel(User.name)
        private userModel=mongoose.Model<User>
    ){
         this.bot=new TelegramBot(process.env.TELEGRAM,{polling:true}); 
         this.bot.on("message",this.onReceiveMessage) 
    } 

    onReceiveMessage=async (msg)=>{
        if(msg.text==="/start")
        { 
            try {
                const res=await this.createUser({
                    name:msg.chat.first_name,
                    username:msg.chat.username,
                    chatId:msg.chat.id
                })
                
                this.bot.sendMessage(msg.chat.id,"Welcome to Our Weather Bot, Send the name of the city in order to get the Weather Updates.")
                
            } catch (error) {
                console.log(error)
            }
        }else{
            try {
                const user=await this.userModel.findOne({chatId:msg.chat.id})
                if(user){

                    if(user.isBlocked){
                        this.bot.sendMessage(user.chatId,"The bot is blocked, please contact the admin")
                        return ;
                    }

                    const weatherData=await axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_KEY}&q=${msg.text}&aqi=no`)
                    const result=weatherData.data
                    this.bot.sendMessage(user.chatId,`The current weather in ${result.location.name} is ${result.current.condition.text}, The temperature is ${result.current.temp_c}°C and humidity is ${result.current.humidity}.`)
                }else{
                    this.bot.sendMessage(user.chatId,"Please use the command \start to enable the bot")
                }
            } catch (error) {
                if(error.code==="ERR_BAD_REQUEST"){
                    this.bot.sendMessage(msg.chat.id,"Can't find the location")
                    return ;
                }
                console.log(error)
            }
        }
    }

    
    async blockUser(userId){
        try {
            await this.userModel.findOneAndUpdate({ chatId: userId },{isBlocked:true});
            return "User has been blocked successfully";
        } catch (error) {
            console.log(error)
        }
    }

    async unBlockUser(userId){
        try {
            await this.userModel.findOneAndUpdate({ chatId: userId },{isBlocked:false});
            return "User has been unblocked successfully";
        } catch (error) {
            console.log(error)
        }
    }

    async removeUser(userId){
        try {
            await this.userModel.findOneAndDelete({ chatId: userId });
            return "User has been removed successfully";
        } catch (error) {
            console.log(error)
        }
    }

    async fetchAllUsers(){
        try {
            const users=await this.userModel.find({})
            return users;
        } catch (error) {
            console.log(error)
        }
    }

    async createUser(user){
        try{
            const res=await this.userModel.create(user) 
            return res;
        }catch(err){
            console.log(err)
        }
    }


}

