const express = require('express');
const {
  getBranches,
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch
} = require('../controllers/branchController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(getBranches)
  .post(authorize('ADMIN'), createBranch);

router.route('/:id')
  .get(getBranch)
  .put(authorize('ADMIN'), updateBranch)
  .delete(authorize('ADMIN'), deleteBranch);

module.exports = router;