import mongoose, { Schema } from "mongoose"; 


const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  available: {
    type: Boolean,
    required: false,
  },

  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  
});


export const CategoryModel = mongoose.model('Category', categorySchema);