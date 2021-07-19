const mongoose = require("mongoose");
const Float = require("mongoose-float").loadType(mongoose);

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Float,
  details: String,
  description: String,
  images: [String],
  category: [String],
  itemWeight: Number,
  quantity: Number,
});

module.exports = {
  ProductModel: mongoose.model("Product", ProductSchema),
  ProductSchema: ProductSchema,
};
