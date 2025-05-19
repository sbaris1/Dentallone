const express = require('express');
const {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorAppointments
} = require('../controllers/doctorController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(getDoctors)
  .post(authorize('ADMIN'), createDoctor);

router.route('/:id')
  .get(getDoctor)
  .put(authorize('ADMIN', 'DOCTOR'), updateDoctor)
  .delete(authorize('ADMIN'), deleteDoctor);

router.route('/:id/appointments')
  .get(authorize('ADMIN', 'DOCTOR', 'SECRETARY'), getDoctorAppointments);

module.exports = router;