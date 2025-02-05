const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all categories
router.get('/', async (req, res) => {
  try {
    const [categories] = await db.query(`
      SELECT c.*, COUNT(p.id) as products_count 
      FROM categories c 
      LEFT JOIN products p ON c.id = p.category_id 
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `);
    console.log('Categories fetched:', categories);
    res.json(categories);
  } catch (error) {
    console.error('Error getting categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create category
router.post('/', async (req, res) => {
  try {
    console.log('Received create category request:', req.body);
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    // Check if category exists
    const [existingCategory] = await db.query(
      'SELECT id FROM categories WHERE name = ?', 
      [name]
    );
    
    if (existingCategory.length > 0) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }

    const [result] = await db.query(
      'INSERT INTO categories (name) VALUES (?)',
      [name]
    );

    console.log('Category created:', result);

    res.status(201).json({
      message: 'Category created successfully',
      category: {
        id: result.insertId,
        name
      }
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Failed to create category: ' + error.message });
  }
});

// Update category
router.put('/:id', async (req, res) => {
  try {
    console.log('Received update category request:', req.params.id, req.body);
    const { name } = req.body;
    const { id } = req.params;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const [existingCategory] = await db.query(
      'SELECT id FROM categories WHERE name = ? AND id != ?', 
      [name, id]
    );
    
    if (existingCategory.length > 0) {
      return res.status(400).json({ message: 'Category with this name already exists' });
    }

    const [result] = await db.query(
      'UPDATE categories SET name = ? WHERE id = ?',
      [name, id]
    );

    console.log('Category updated:', result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category updated successfully' });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ message: 'Failed to update category: ' + error.message });
  }
});

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    console.log('Received delete category request:', req.params.id);
    const { id } = req.params;
    
    const [products] = await db.query(
      'SELECT COUNT(*) as count FROM products WHERE category_id = ?',
      [id]
    );
    
    if (products[0].count > 0) {
      return res.status(400).json({ 
        message: 'Cannot delete category that has products. Please remove or reassign products first.' 
      });
    }

    const [result] = await db.query('DELETE FROM categories WHERE id = ?', [id]);

    console.log('Category deleted:', result);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ message: 'Failed to delete category: ' + error.message });
  }
});

// Get category by ID
router.get('/:id', async (req, res) => {
  try {
    const [category] = await db.query(`
      SELECT c.*, COUNT(p.id) as products_count 
      FROM categories c 
      LEFT JOIN products p ON c.id = p.category_id AND p.status = 'active'
      WHERE c.id = ?
      GROUP BY c.id
    `, [req.params.id]);

    if (category.length === 0) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json(category[0]);
  } catch (error) {
    console.error('Error getting category:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 