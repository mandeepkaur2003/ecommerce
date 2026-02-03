import { Prop,Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { UserRole } from "../enum/user-role.enum";
export type userDocument=User& Document
@Schema({timestamps:true})
export class User{
    @Prop({required:true})
    name:string
    @Prop({required:true,unique:true,lowercase:true,trim:true})
    email:string
    @Prop({required:true})
    password:string
    @Prop({type:String,enum:UserRole,default:UserRole.USER})
    role:UserRole
}
export const userSchema=SchemaFactory.createForClass(User)