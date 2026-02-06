import { Controller, Post, Get,Query } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,private readonly productService:ProductService
  ) {}


//   @Post('seed')
//   async seedProducts() {
//     const res = await fetch(
//       'https://dummyjson.com/products/category/smartphones?limit=30',
//     );
//     const data = await res.json();

//     const products = data.products; 
//     const adminId = new Types.ObjectId('6982caea271637c913b2144e');

//     const formatted = products.map((p) => ({
//       title: p.title,
//       description: p.description,
//       price: p.price,
//       images: p.images,        
//       category: p.category,
//       brand: p.brand,
//       rating: p.rating,
//       stock: p.stock,
//       addedBy: adminId,
//     }));

//     await this.productModel.insertMany(formatted);

//     return {
//       message: '✅ Products seeded successfully',
//       count: formatted.length,
//     };
//   }


//   @Get()
//   async getAllProducts() {
//     return this.productModel
//       .find()
//       .populate('addedBy', 'name email role');
//   }
@Get()
getProducts(@Query('page')page:string,@Query('limit') limit:string){
    return this.productService.getProducts(Number(page),Number(limit))
    return 

}
}
