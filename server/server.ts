import express from "express";
import mongoose from "mongoose";
// const  = require("./models/Product");
import { Product } from "./models/Product";
const app = express();
const cors = require("cors");
const mongo = require("mongodb").MongoClient;
const assert = require("assert");

const url =
  "mongodb+srv://shop_app:apo0khan@cluster0.xg3tm.mongodb.net/shop?retryWrites=true&w=majority";

mongoose.connect(url).then(() => console.log("DB Connection Successfull!"));

app.use(
  cors({
    Origin: "*",
  })
);
const User = require("./models/User");

app.use(express.json());

//REGISTER

app.post("/register", async (req, res) => {
  console.log("register is Called", req.body);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET DATA

app.get("/getProductsList", async (req, res) => {
  Product.find()
    .then((products: any) => {
      console.log(products);
      res.send(products);
    })
    .catch((err: any) => {
      console.log(err);
    });
});

app.get("/getProductById/:id", async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    res.send({ status: "error", productData: undefined });
    return;
  }

  const productData = await Product.findById(productId);

  res.send({ productData });
});

//ADD PRODUCT

app.post("/Addproduct", async (req, res) => {
  const newProduct = new Product({
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
    amount: "1",
    category: req.body.category,
  });
  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
    console.log(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//EDIT PRODUCT DATA

app.put("/Editproduct/:id", async (req, res) => {
  const id = req.params.id;

  console.log(id);
  Product.findOneAndUpdate({
    id,
    $set: {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
    },
  }).then(() => console.log("hello world"));
});

//DELETE PRODUCT

app.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Product.findByIdAndDelete(id, function (err: any, docs: any) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", docs);
    }
  });
  console.log(" Deleted ");
});

//LOGIN

app.post("/Login", async (req, res) => {
  try {
    const userWithName = await User.findOne({
      username: req.body.username,
    });

    if (!userWithName) {
      res.send({ status: "userNotFound" });
      return;
    }

    const userWithPassword = await User.findOne({
      username: req.body.username,
      password: req.body.password,
    });

    if (!userWithPassword) {
      res.send({ status: "wrongPassword" });
      return;
    }

    res.send({ status: "loginSuccess", username: userWithPassword.username });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3000, () => {
  console.log("Backend server is running");
});
