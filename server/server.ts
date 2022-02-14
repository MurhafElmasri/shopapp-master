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
    console.log("Product is added successfuly");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PRODUCT LIST

app.get("/getProductsList", async (req, res) => {
  Product.find()
    .then((products: any) => {
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

  res.send({ status: "success", productData });
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
        console.log("Product data is updated successfuly");
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

//DELTE ALL PRODUCTS
app.delete("/delete-all-products", (req, res) =>
  Product.remove().then(function () {
    console.log("Data deleted"); // Success
  })
);

//ADD CART ITEM

app.post("/AddCartitem", async (req, res) => {
  const newcartitem = new Cartitem({
    userID: req.body.userID,
    productID: req.body.productID,
    // title: req.body.title,
    // image: req.body.image,
    // description: req.body.description,
    // price: req.body.price,
    amount: "1",
    // category: req.body.category,
  });
  try {
    const savedCartitem = await newcartitem.save();
    res.status(201).json(savedCartitem);
    console.log("Product is added to cart successfuly");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CART ITEMS

app.get("/getCartitemIDs/:userID", async (req, res) => {
  const id = req.params.userID;
  Cartitem.find({ userID: id })
    .then((Cartitems: any) => {
      // console.log(...Cartitems.productID);
      res.send(Cartitems);
    })
    .catch((err: any) => {
      console.log(err);
    });
});

//GETCART

app.get("/getCartitems/:productID", async (req, res) => {
  const id = req.params.productID;

  const cartitemdata = await Product.findById(id);
  if (cartitemdata === null) {
    res.send({ status: "error" });
  } else {
    res.send({ cartitemdata, status: "success" });
  }

  // .then((Cartitems: any) => {
  //   // console.log(...Cartitems.productID);
  //   res.send(cartitemdata);
  // })
  // .catch((err: any) => {
  //   console.log(err);
  // });
});

//GET SINGLE CART ITEM

app.get("/getcartitemById/:id", async (req, res) => {
  const cartitemid = req.params.id;

  if (!cartitemid) {
    res.send({ status: "Cart item not found" });
    return;
  }
  console.log(cartitemid);
  const productData = await Cartitem.findOne({ productID: cartitemid });

  if (productData === null) {
    res.send({ status: "error" });
  } else {
    res.send({ productData, status: "success" });
  }
});

//GET MANY CART ITEMS

app.post("/getcartitems", async (req, res) => {
  const cartitemid = req.body.id;

  if (!cartitemid) {
    res.send({ status: "Cart item not found" });
    return;
  }
  console.log(cartitemid);
  const isitemincart = await Product.find({ productID: cartitemid });

  if (isitemincart === null) {
    res.send({ status: "error" });
  } else {
    res.send({ isitemincart, status: "success" });
  }
});

//EDIT CART ITEM

app.put("/Editcartitem", async (req, res) => {
  console.log("Editcartitem called");
  const filter = { userID: req.body.userID, productID: req.body.productID };

  Cartitem.findOneAndUpdate(
    filter,
    {
      $set: {
        amount: req.body.amount,
      },
    },
    { new: true },

    (err: any, doc: any) => {
      if (err) {
        console.log("Something wrong when updating data!");
      }else {
        console.log(doc)
        res.send(doc)
      }
    }
  );
});


//DELETE CART ITEM

app.delete("/Deletecartitem", (req, res) => {
  console.log("Cart item delete called")
  Cartitem.findOneAndDelete(
    { userID: req.body.userID },
    { productID: req.body.id },
    function (err: any, docs: any) {
      if (err) {
        console.log(err);
      } else {
        console.log("Deleted : ", docs);
      }
    }
  );
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

    res.send({ status: "loginSuccess", id: userWithPassword._id });
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET SINGLE USER

app.get("/getUserById/:id", async (req, res) => {
  const userID = req.params.id;

  if (!userID) {
    res.send({ status: "error", userData: undefined });
    return;
  }

  const userData = await User.findById(userID);

  res.send({ status: "success", user: userData });
});

app.listen(3000, () => {
  console.log("Backend server is running");
});
