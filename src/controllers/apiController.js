const model = require('../models/apiModel');

const createItem = async (req, res) => {
  try {
    await model.createItem(req.body);
    res.status(201).json({ message: 'Item created successfully' });
  } catch (err) {
    console.error('Create error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const getItems = async (req, res) => {
  try {
    const items = await model.getItems();
    res.status(200).json(items);
  } catch (err) {
    console.error('Get items error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
};

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

module.exports = { createItem, getItems, getItemById, updateItemById, deleteItemById };
