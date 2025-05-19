const express = require('express');
const {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(getAppointments)
  .post(authorize('ADMIN', 'DOCTOR', 'SECRETARY'), createAppointment);

router.route('/:id')
  .get(getAppointment)
  .put(authorize('ADMIN', 'DOCTOR', 'SECRETARY'), updateAppointment)
  .delete(authorize('ADMIN', 'SECRETARY'), deleteAppointment);

module.exports = router;