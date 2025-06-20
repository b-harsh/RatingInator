const db = require('../db');

exports.getAllProducts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * from Products');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching products', error: err });
  }
};
