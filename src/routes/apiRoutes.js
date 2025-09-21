const express = require('express');
const router = express.Router();
const controller = require('../controllers/apiController');

// Define API endpoints
// router.post('/{command}"', controller.{command});
router.post('/create', controller.createItem);          // Create a new item/user
router.post('/login', controller.loginUser);           // Login endpoint
router.get('/items', controller.getItems);            // Get all items
router.get('/item/:id', controller.getItemById);      // Get single item by ID
router.patch('/update/:id', controller.updateItemById); // Update item by ID
router.delete('/delete/:id', controller.deleteItemById); // Delete item by ID

module.exports = router;
