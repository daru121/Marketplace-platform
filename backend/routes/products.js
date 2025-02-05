const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const slugify = require('slugify');

// Konfigurasi multer untuk upload file
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/products')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Not an image! Please upload an image.'), false);
    }
  },
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB limit
  }
});

// Get all products
router.get('/', async (req, res) => {
  try {
    let query = `
      SELECT p.*, c.name as category_name 
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE 1=1
    `;
    
    const params = [];

    // Filter untuk status active jika bukan admin
    if (!req.query.isAdmin) {
      query += ` AND p.status = 'active'`;
    }

    // Filter pencarian
    if (req.query.search) {
      query += ` AND (p.name LIKE ? OR p.description LIKE ?)`;
      params.push(`%${req.query.search}%`, `%${req.query.search}%`);
    }

    // Filter kategori
    if (req.query.category) {
      query += ` AND p.category_id = ?`;
      params.push(req.query.category);
    }
    
    query += ` ORDER BY p.created_at DESC`;

    // Limit jika ada
    if (req.query.limit) {
      query += ` LIMIT ?`;
      params.push(parseInt(req.query.limit));
    }

    const [products] = await db.query(query, params);
    res.json(products);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get flash sale products
router.get('/flash-sale', async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT p.*, c.name as category_name 
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.flash_sale = TRUE 
      AND p.flash_sale_start <= NOW() 
      AND p.flash_sale_end >= NOW()
      AND p.status = 'active'
    `);
    res.json(products);
  } catch (error) {
    console.error('Error getting flash sale products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get popular products
router.get('/popular', async (req, res) => {
  try {
    const [products] = await db.query(`
      SELECT p.*, c.name as category_name 
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.status = 'active'
      ORDER BY p.total_sold DESC
      LIMIT 12
    `);
    res.json(products);
  } catch (error) {
    console.error('Error getting popular products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update flash sale settings
router.put('/:id/flash-sale', async (req, res) => {
  try {
    const { id } = req.params;
    const { 
      flash_sale,
      flash_sale_price,
      flash_sale_start,
      flash_sale_end 
    } = req.body;

    await db.query(`
      UPDATE products 
      SET flash_sale = ?,
          flash_sale_price = ?,
          flash_sale_start = ?,
          flash_sale_end = ?
      WHERE id = ?
    `, [flash_sale, flash_sale_price, flash_sale_start, flash_sale_end, id]);

    res.json({ message: 'Flash sale settings updated successfully' });
  } catch (error) {
    console.error('Error updating flash sale:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create product
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, stock, category_id } = req.body;
    
    // Validasi input
    if (!name || !price || !category_id) {
      return res.status(400).json({ message: 'Name, price and category are required' });
    }

    // Generate slug
    const slug = slugify(name, { lower: true, strict: true });
    
    // Check if slug exists
    const [existingSlug] = await db.query('SELECT id FROM products WHERE slug = ?', [slug]);
    if (existingSlug.length > 0) {
      return res.status(400).json({ message: 'Product with similar name already exists' });
    }

    const image_url = req.file ? `/uploads/products/${req.file.filename}` : null;

    const [result] = await db.query(
      `INSERT INTO products (name, slug, description, price, stock, category_id, image_url) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, slug, description, price, stock, category_id, image_url]
    );

    res.status(201).json({
      message: 'Product created successfully',
      productId: result.insertId
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Failed to create product' });
  }
});

// Update product
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, stock, category_id, status } = req.body;
    
    // Validasi input
    if (!name || !price || !category_id) {
      return res.status(400).json({ message: 'Name, price and category are required' });
    }

    // Generate slug
    const slug = slugify(name, { lower: true, strict: true });
    
    // Check if slug exists (excluding current product)
    const [existingSlug] = await db.query(
      'SELECT id FROM products WHERE slug = ? AND id != ?', 
      [slug, id]
    );
    if (existingSlug.length > 0) {
      return res.status(400).json({ message: 'Product with similar name already exists' });
    }

    let query = `UPDATE products 
                 SET name = ?, slug = ?, description = ?, 
                     price = ?, stock = ?, category_id = ?`;
    let params = [name, slug, description, price, stock, category_id];

    if (status) {
      query += `, status = ?`;
      params.push(status);
    }

    if (req.file) {
      query += `, image_url = ?`;
      params.push(`/uploads/products/${req.file.filename}`);
    }

    query += ` WHERE id = ?`;
    params.push(id);

    await db.query(query, params);

    res.json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Failed to update product' });
  }
});

// Delete product
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router; 