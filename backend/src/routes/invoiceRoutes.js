const express = require('express');
const {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice
} = require('../controllers/invoiceController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(authorize('ADMIN', 'SECRETARY'), getInvoices)
  .post(authorize('ADMIN', 'SECRETARY'), createInvoice);

router.route('/:id')
  .get(getInvoice)
  .put(authorize('ADMIN', 'SECRETARY'), updateInvoice)
  .delete(authorize('ADMIN'), deleteInvoice);

module.exports = router;