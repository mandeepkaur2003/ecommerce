import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schema/user.schema';
import { userDocument } from './schema/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel:Model<userDocument>){}
    async findByEmail(email){
        return await this.userModel.findOne({email})
    }
    async createUser(data){
        return await this.userModel.create(data)
    }
}
