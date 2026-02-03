import { Controller,Req,UseGuards,Get } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly cartService:CartService){}
    @UseGuards(JwtGuard)
     @Get()
getCart(@Req() req) {
  console.log(req.user.id); 
  return {sent:req.user};
}


}
