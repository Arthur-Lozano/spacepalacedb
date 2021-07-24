"use strict";

const express = require("express");

const { ProductModel } = require("../models/products-model");

// const basicAuth = require("../middleware/basic.js");
const bearerAuth = require("../middleware/bearer.js");

const productRouter = express.Router();

//ROUTE FUNCTIONS
const getAllProducts = async (req, res, next) => {
  try {
    let allProducts = await ProductModel.find({});
    res.status(200).json(allProducts);
  } catch (e) {
    next(e.message);
  }
};

const createProduct = async (req, res, next) => {
  try {
    let product = new ProductModel(req.body);
    const newProduct = await product.get.save();

    res.status(201).json(newProduct);
  } catch (e) {
    next(e.message);
  }
};
const insertDummyData = async (req, res, next) => {
  try {
    let products = await ProductModel.insertMany(req.body);

    res.status(201).json(products);
  } catch (e) {
    next(e.message);
  }
};

const getOne = async (req, res, next) => {
  try {
    let oneProduct = await ProductModel.find({ id: req.params.id });
    res.status(200).json(oneProduct);
  } catch (e) {
    next(e.message);
  }
};
//ROUTES

productRouter.get("/products", getAllProducts);
productRouter.post("/products/:id", getOne);
productRouter.post("/product/create", createProduct);
productRouter.post("/products/dummydata", insertDummyData);


module.exports = productRouter;
