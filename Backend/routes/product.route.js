const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { productModel } = require('../model/product.model');
let productRouter = express.Router();

// Ensure the upload directory exists
const uploadDir = path.resolve('./uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");  // Set the destination for the files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));  // Set the filename for the uploaded files
  }
});

// Set up multer upload with validation and file size limit (max 10MB)
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },  // Max file size 10MB
}).array('productImages', 12);  // Up to 12 files allowed, field name must be 'productImage'

productRouter.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).send({ "message": "Successfully retrieved the data from the database", data: products });
  } catch (error) {
    res.status(500).send({ "Error-message": error.message });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).send({ "Error-message": "Product not found" });
    }
    res.status(200).send({ "message": "Successfully retrieved the data from the database", data: product });
  } catch (error) {
    res.status(500).send({ "Error-message": error.message });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).send({ "Error-message": "Product not found" });
    }
    res.status(200).send({ "message": "Successfully deleted the product" });
  } catch (error) {
    res.status(500).send({ "Error-message": error.message });
  }
});

productRouter.post('/create', upload, async (req, res) => {
  try {
    // Check if files are uploaded
    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ "Error-message2": "No files uploaded" });
    }

    const { productName, productDescription, productPrice } = req.body;

    // Check for required fields
    if (!productName || !productDescription || !productPrice) {
      return res.status(400).send({ "Error-message": "Missing required fields" });
    }

    // Map the file paths to be saved in the database
    const imgPath = req.files.map((file) => `/uploads/${file.filename}`);

    // Create a new product
    const newProduct = new productModel({
      productName,
      productDescription,
      productPrice,
      productImages: imgPath
    });

    // Save the product to the database
    await newProduct.save();

    // Respond with a success message
    res.status(201).json({
      "message": "Hurray! Product added to the database successfully",
      "product": newProduct
    });
  } catch (error) {
    console.error("Error in catch block:", error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = { productRouter };
