import express from "express";
import mongoose from "mongoose";
const app = express();
const productRoute = require("./routes/product");
const cors = require("cors");

app.use(
  cors({
    Origin: "*",
  })
);
const User = require("./models/User");
const Product = require("./models/Product")

mongoose
  .connect(
    "mongodb+srv://shop_app:apo0khan@cluster0.xg3tm.mongodb.net/shop?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connection Successfull!"));

app.use(express.json());


app.use("/api", productRoute);

app.post("/test", (req, res) => {
  const reqBody = req.body;

  console.log({ req: reqBody });

  res.send({ text: "Hello World!!" });
});

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

//ADDPRODUCT
app.post("/Addproduct", async (req, res) => {
  console.log("Addproduct is Called");

  const newProduct = new Product({
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,

  });

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});


//LOGIN

app.post("/Login", async (req, res) => {
  console.log("Login Called");

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
      //   res.status(401).json("Wrong Password");
      return;
    }

    res.send({ status: "loginSuccess" });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(3000, () => {
  console.log("Backend server is running");
});
