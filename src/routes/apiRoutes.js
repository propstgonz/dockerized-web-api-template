const express = require('express');
const router = express.Router();
const controller = require('../controllers/apiController');

router.post('/create', controller.createItem);
router.get('/items', controller.getItems);
router.get('/item/:id', controller.getItemById);
router.patch('/update/:id', controller.updateItemById);
router.delete('/delete/:id', controller.deleteItemById);

module.exports = router;
