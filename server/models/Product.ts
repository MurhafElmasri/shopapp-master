import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

interface ProductType {
  _id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  amount: number;
}

export const Product = mongoose.model<ProductType>("Product", ProductSchema);
