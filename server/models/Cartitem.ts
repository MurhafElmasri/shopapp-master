import mongoose from "mongoose";

const CartitemSchema = new mongoose.Schema(
  {
    userID: { type: String }, // TODO change it to userId

    // TODO change product info to productId
    productID: { type: String, required: true },
    // title: { type: String, required: true },
    // description: { type: String, required: true },
    // image: { type: String, required: true },
    // price: { type: Number, required: true },
    amount: { type: Number, required: true },
    // category: { type: String, required: true },
  },
);

interface CartitemType {
  userID: string;
  productID: string;
  // title: string;
  // description: string;
  // image: string;
  // price: number;
  amount: number;
  // category: string;
}

export const Cartitem = mongoose.model<CartitemType>(
  "Cartitem",
  CartitemSchema
);
