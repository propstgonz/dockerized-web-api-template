const model = require('../models/apiModel');
const bcrypt = require('bcrypt');

// CREAR USUARIO / REGISTRO
const createItem = async (req, res) => {
  try {
    const data = { ...req.body };
    
    // Hashear la contraseña
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

// LOGIN DE USUARIO
const loginUser = async (req, res) => {
  try {
    const { identifier, user_password } = req.body;

    if (!identifier || !user_password) {
      return res.status(400).json({ message: 'Faltan credenciales' });
    }

    // Obtener todos los usuarios y filtrar por username o email
    const users = await model.getItems();
    const user = users.find(u => u.username === identifier || u.email === identifier);

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    // Comparar contraseña con bcrypt
    const match = await bcrypt.compare(user_password, user.user_password);
    if (!match) {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    // Login exitoso
    res.status(200).json({
      message: 'Login exitoso',
      user: { id: user.id, username: user.username, email: user.email }
    });

  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

// RESTO DE CONTROLADORES
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

module.exports = { 
  createItem, 
  loginUser, 
  getItems, 
  getItemById, 
  updateItemById, 
  deleteItemById 
};
