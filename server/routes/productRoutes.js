const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  try {
    const [products] = await db.query(` SELECT 
        p.*, 
        ROUND(AVG(r.rating), 1) AS average_rating
      FROM products p
      LEFT JOIN reviews r ON p.id = r.product_id
      GROUP BY p.id`);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching Details', error: err });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    if (rows.length === 0)
      return res.status(404).json({ message: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching product', error: err });
  }
});

module.exports = router;
