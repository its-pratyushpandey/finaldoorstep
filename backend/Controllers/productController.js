// Controllers/productController.js
import Product from '../Models/Product.js';

// GET all products
export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err.message);
    next(err);
  }
};

// CREATE a new product
export const createProduct = async (req, res, next) => {
  try {
    const { name, price, category } = req.body;
    const newProduct = new Product({ name, price, category });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    console.error('Error creating product:', err.message);
    next(err);
  }
};

// UPDATE a product
export const updateProduct = async (req, res, next) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(updated);
  } catch (err) {
    console.error('Error updating product:', err.message);
    next(err);
  }
};

// DELETE a product
export const deleteProduct = async (req, res, next) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    console.error('Error deleting product:', err.message);
    next(err);
  }
};