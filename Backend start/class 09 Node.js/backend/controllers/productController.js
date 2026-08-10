const Product = require('../models/Product');
const { getDbMode } = require('../config/db');
const { readDB, writeDB, genId } = require('../config/jsonDB');

const getProducts = async (req, res) => {
  try {
    if (getDbMode() === 'mongodb') {
      const products = await Product.find().sort({ createdAt: -1 });
      return res.status(200).json(products);
    }
    const db = readDB();
    const sorted = [...db.products].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    res.status(200).json(sorted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    if (getDbMode() === 'mongodb') {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      return res.status(200).json(product);
    }
    const db = readDB();
    const product = db.products.find((p) => p._id === req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (getDbMode() === 'mongodb') {
      const product = new Product({ name, description, price });
      const createdProduct = await product.save();
      return res.status(201).json(createdProduct);
    }

    if (!name || !description || price === undefined || price === null) {
      return res.status(400).json({ message: 'Name, description and price are required' });
    }
    const now = new Date().toISOString();
    const product = {
      _id: genId(),
      name,
      description,
      price: Number(price),
      createdAt: now,
      updatedAt: now,
    };
    const db = readDB();
    db.products.push(product);
    writeDB(db);
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    if (getDbMode() === 'mongodb') {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price !== undefined ? price : product.price;
      const updatedProduct = await product.save();
      return res.status(200).json(updatedProduct);
    }

    const db = readDB();
    const idx = db.products.findIndex((p) => p._id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    db.products[idx] = {
      ...db.products[idx],
      name: name !== undefined ? name : db.products[idx].name,
      description: description !== undefined ? description : db.products[idx].description,
      price: price !== undefined ? Number(price) : db.products[idx].price,
      updatedAt: new Date().toISOString(),
    };
    writeDB(db);
    res.status(200).json(db.products[idx]);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    if (getDbMode() === 'mongodb') {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      await Product.deleteOne({ _id: req.params.id });
      return res.status(200).json({ message: 'Product removed successfully' });
    }

    const db = readDB();
    const idx = db.products.findIndex((p) => p._id === req.params.id);
    if (idx === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    db.products.splice(idx, 1);
    writeDB(db);
    res.status(200).json({ message: 'Product removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
