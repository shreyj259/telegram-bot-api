import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose'
import mongoose from 'mongoose';
import { Admin } from './telegram/schemas/admin.schema';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel=mongoose.Model<Admin>
   ){ }

  async create(data){
    return this.adminModel.create(data);
  }

  async findOne(data){
      return this.adminModel.findOne(data);
    
  }

  getHello(): string {
    return 'Hello World!';
  }
}
