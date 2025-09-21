const model = require('../models/apiModel');
const bcrypt = require('bcrypt');

// CREATE ITEM / USER
const createItem = async (req, res) => {
  try {
    const data = { ...req.body };
    
    // Hash password if it exists
    if (data.user_password) {
      const saltRounds = 10;
      data.user_password = await bcrypt.hash(data.user_password, saltRounds);
    }

    await model.createItem(data);
    res.status(201).json({ message: 'Item created successfully' });
  } catch (err) {
    console.error('Create error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// USER LOGIN
const loginUser = async (req, res) => {
  try {
    const { identifier, user_password } = req.body;

    if (!identifier || !user_password) {
      return res.status(400).json({ message: 'Missing credentials' });
    }

    // Get all users and find by username or email
    const users = await model.getItems();
    const user = users.find(u => u.username === identifier || u.email === identifier);

    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Compare password with hashed value
    const match = await bcrypt.compare(user_password, user.user_password);
    if (!match) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // Successful login
    res.status(200).json({
      message: 'Login successful',
      user: { id: user.id, username: user.username, email: user.email }
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET ALL ITEMS
const getItems = async (req, res) => {
  try {
    const items = await model.getItems();
    res.status(200).json(items);
  } catch (err) {
    console.error('Get items error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET ITEM BY ID
const getItemById = async (req, res) => {
  try {
    const item = await model.getItemById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json(item);
  } catch (err) {
    console.error('Get item error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// UPDATE ITEM BY ID
const updateItemById = async (req, res) => {
  try {
    const result = await model.updateItemById(req.params.id, req.body);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json({ message: 'Item updated successfully' });
  } catch (err) {
    console.error('Update error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE ITEM BY ID
const deleteItemById = async (req, res) => {
  try {
    const result = await model.deleteItemById(req.params.id);
    if (result.rowCount === 0) return res.status(404).json({ message: 'Item not found' });
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { 
  createItem, 
  loginUser, 
  getItems, 
  getItemById, 
  updateItemById, 
  deleteItemById 
};
