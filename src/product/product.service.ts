import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';

@Injectable()
export class ProductService {
    constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>
  ) {}
  async getProducts(page,limit)
{
    const skip=(page-1)*limit
    const products=await this.productModel.find().skip(skip).limit(limit)
    const total = await this.productModel.countDocuments();

return {
  data: products,
  page,
  totalPages: Math.ceil(total / limit),
};
}
}
