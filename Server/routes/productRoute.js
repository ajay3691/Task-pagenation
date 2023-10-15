import express from 'express';
import Product from '../models/Product.js';
import multer from 'multer';

const productRoute = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Rename the file with a timestamp
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/png'];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error('Invalid file type. Only JPEG and PNG are allowed.'), false);
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB limit
  },
});

// Create a new product
productRoute.post('/product', upload.single('image'), async (req, res) => {
  try {
    const { name, code, category, image, description } = req.body;
    const newProduct = new Product({
      name,
      code,
      category,
      image,
      description,
    });
    await newProduct.save();
    res.status(201).json({ product: newProduct, message: 'Product created' });
  } catch (error) {
    res.status(400).json({ error: 'Product not created' });
  }
});

// Get all products
productRoute.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ products, message: 'Get all products' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

// Get a single product by ID
productRoute.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ product, message: 'Get single product' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

// Update a product by ID
productRoute.put('/product/:id', async (req, res) => {
  try {
    const { name, code, category, image, description } = req.body;
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        code,
        category,
        image,
        description,
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ updatedProduct, message: 'Updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

// Delete a product by ID
productRoute.delete('/product/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error', message: err.message });
  }
});

export default productRoute;
