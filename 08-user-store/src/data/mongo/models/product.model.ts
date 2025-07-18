import mongoose, { Schema } from "mongoose"; 


const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  available: {
    type: Boolean,
    required: false,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },

  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function ( doc, ret ) {
    delete ret._id;
  }
});

export const ProductModel = mongoose.model('Product', productSchema);