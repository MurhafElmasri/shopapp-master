const Product = require("../models/Product");
import express from "express";
var router = express.Router();

router.post('/product', async (req, res) =>{
    const product = new Product ({
        title: req.body.title,
        desc: req.body.desc,
        img: req.body.img,
        price: req.body.price,
    })
    try {
        const savedUser = await product.save();
        res.status(201).json(savedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    
})

module.exports = router;