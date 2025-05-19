const express = require('express');
const {
  getInventoryItems,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
} = require('../controllers/inventoryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(authorize('ADMIN', 'SECRETARY'), getInventoryItems)
  .post(authorize('ADMIN', 'SECRETARY'), createInventoryItem);

router.route('/:id')
  .get(authorize('ADMIN', 'SECRETARY'), getInventoryItem)
  .put(authorize('ADMIN', 'SECRETARY'), updateInventoryItem)
  .delete(authorize('ADMIN'), deleteInventoryItem);

module.exports = router;