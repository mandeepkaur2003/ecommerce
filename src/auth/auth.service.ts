import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from "bcrypt"
import { InternalServerErrorException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { OtpService } from 'src/otp/otp.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService,private jwtService:JwtService,private readonly mailService:MailService,private readonly otpService:OtpService){}
    
    async signup(data:SignupDto,res){
        try{
        const user=await this.userService.findByEmail(data.email)
        if(user){
            return{
                success:false,
                msg:"User already registered"
            }
        }
        const hashPassword=await bcrypt.hash(data.password,10)
        const newUser=await this.userService.createUser({...data,password:hashPassword})
        const token=this.jwtService.sign({
            id:newUser._id,
            email:newUser.email,
            role:newUser.role
        })
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite: "lax",
         maxAge:  24 * 60 * 60 * 1000
        }
        )
        return{
            success:true,
            msg:"Registered"
        }

    }catch(err){
              throw new InternalServerErrorException(err)
    }}
    async login(data:LoginDto,res){
        try{
            const user=await this.userService.findByEmail(data.email)
            if(!user){
                return {
                    success:false,
                    msg:"You are not registered"
                }
            }
            const isMatch=await bcrypt.compare(data.password,user.password)
            if(!isMatch){
                return{
                    success:false,
                    msg:"Invalid credentials"
                }
            }
             const token=this.jwtService.sign({
            id:user._id,
            email:user.email,
            role:user.role
        })
        res.cookie('token',token,{
            httpOnly:true,
            secure:false,
            sameSite: "lax",
         maxAge: 24 * 60 * 60 * 1000
        }
        )
            return{
                success:true,
                msg:"Successfuly Login"
            }

        }catch(err){

        }

    }
    async logout(res){
          res.clearCookie("token", {
    httpOnly: true,
    secure: false,     
    sameSite: "lax",
  });
  return{
    success:true
  }
    }
    async forgotPassword(email){
        const user=await this.userService.findByEmail(email)
        if(!user){
            return {
                success:false,
                msg:"User doesnot exist"
            }
        }
        const otp=Math.floor(100000+Math.random()*900000).toString()
        const expiresAt=Date.now()+5*60*1000
        await this.otpService.saveOtp({userId:user._id,otp,expiresAt})
            await this.mailService.sendOtpMail(email, otp);

                 return { success: true };


    }
    
}
