const express = require('express');
const {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientAppointments,
  getPatientInvoices
} = require('../controllers/patientController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(authorize('ADMIN', 'DOCTOR', 'SECRETARY'), getPatients)
  .post(authorize('ADMIN', 'SECRETARY'), createPatient);

router.route('/:id')
  .get(getPatient)
  .put(authorize('ADMIN', 'SECRETARY'), updatePatient)
  .delete(authorize('ADMIN'), deletePatient);

router.route('/:id/appointments')
  .get(getPatientAppointments);

router.route('/:id/invoices')
  .get(getPatientInvoices);

module.exports = router;