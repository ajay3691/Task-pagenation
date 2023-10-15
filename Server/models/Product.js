import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, /* unique: true */ },
  code: { type: String/* ,  unique: true  */},
  category: { type: String, /* required: true */ },
  image: { type: String },
  description: String,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
