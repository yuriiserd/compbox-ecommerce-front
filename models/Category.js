import mongoose, { model, models, Schema } from "mongoose"

const CategorySchema = new Schema({
  name: {type: String, required: true},
  image: {type: String},
  childrens: {type: Array},
  parent: {type:mongoose.Types.ObjectId, ref: 'Category'},
  properties: [{
    name: {type: String},
    values: [{type: String}]
  }],
  order: {type: Number}
});

export const Category = models.Category || model('Category', CategorySchema);