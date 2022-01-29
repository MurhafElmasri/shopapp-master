import express from "express";
import mongoose from "mongoose";
import { Product } from "./models/Product";
import { User } from "./models/User";
import { Cartitem } from "./models/Cartitem";
const app = express();
const cors = require("cors");

const url =
  "mongodb+srv://shop_app:apo0khan@cluster0.xg3tm.mongodb.net/shop?retryWrites=true&w=majority";

mongoose.connect(url).then(() => console.log("DB Connection Successfull!"));

app.use(
  cors({
    Origin: "*",
  })
);

app.use(express.json());

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

//GET PRODUCT LIST

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

//GET SINGLE PRODUCT

app.get("/getProductById/:id", async (req, res) => {
  const productId = req.params.id;

  if (!productId) {
    res.send({ status: "error", productData: undefined });
    return;
  }

  const productData = await Product.findById(productId);

  res.send({ data: productData });
});

//EDIT PRODUCT DATA

app.put("/Editproduct/:id", async (req, res) => {
  const id = req.params.id;

  Product.findOneAndUpdate({
    id,
    $set: {
      title: req.body.title,
      image: req.body.image,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    },
    function(err: any, updatedData: any) {
      if (err) {
        res.send("Error updating");
      } else {
        console.log(id);
      }
    },
  });
});

//DELETE PRODUCT

app.delete("/Deleteproduct/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Product.findByIdAndDelete(id, function (err: any, docs: any) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", docs);
    }
  });
});

//ADD CART ITEM

app.post("/AddCartitem", async (req, res) => {
  const newcartitem = new Cartitem({
    username: req.body.username,
    _id: req.body._id,
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    price: req.body.price,
    amount: "1",
    category: req.body.category,
  });
  try {
    const savedCartitem = await newcartitem.save();
    res.status(201).json(savedCartitem);
    console.log(savedCartitem);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CART ITEMS

app.get("/getCartitems", async (req, res) => {
  Cartitem.find()
    .then((Cartitems: any) => {
      console.log(Cartitems);
      res.send(Cartitems);
    })
    .catch((err: any) => {
      console.log(err);
    });
});

//GET SINGLE CART ITEM

app.get("/getcartitemById/:id", async (req, res) => {
  const cartitemid = req.params.id;

  if (!cartitemid) {
    res.send({ status: "Cart item not found" });
    return;
  }
  console.log(cartitemid);
  const isitemincart = await Cartitem.findById(cartitemid);

  if (isitemincart === null) {
    res.send({ status: "error" });
  } else {
    res.send({ isitemincart, status: "success" });
  }
});

//EDIT CART ITEM

app.put("/Editcartitem", async (req, res) => {
  const cartitemid = req.body.id;
  console.log("Editcartitem called");
  console.log(req.body.amount);
  Cartitem.findByIdAndUpdate(
    cartitemid,
    {
      $set: {
        amount: req.body.amount,
      },
    },
    function (err, updatedData) {
      if (err) {
        res.send("Error updating");
      } else {
        console.log(cartitemid);
      }
    }
  );
});

//DELETE CART ITEM

app.delete("/Deletecartitem/:id", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Cartitem.findByIdAndDelete(id, function (err: any, docs: any) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted : ", docs);
    }
  });
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
