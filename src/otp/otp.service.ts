import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from './schema/otp.schema';
import { otpDocument } from './schema/otp.schema';
@Injectable()
export class OtpService {
    constructor(@InjectModel(Otp.name) private otpModel:Model<otpDocument>){}
    async saveOtp({userId,otp,expiresAt}){
         await this.otpModel.deleteMany({ user: userId });
        await this.otpModel.create({userId,otp,expiresAt})
    }
}
