const express = require('express');
const {
  getTreatments,
  getTreatment,
  createTreatment,
  updateTreatment,
  deleteTreatment,
  addDoctorToTreatment,
  removeDoctorFromTreatment
} = require('../controllers/treatmentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply authentication middleware to all routes
router.use(protect);

// Routes
router.route('/')
  .get(getTreatments)
  .post(authorize('ADMIN', 'DOCTOR'), createTreatment);

router.route('/:id')
  .get(getTreatment)
  .put(authorize('ADMIN', 'DOCTOR'), updateTreatment)
  .delete(authorize('ADMIN'), deleteTreatment);

router.route('/:id/doctors')
  .post(authorize('ADMIN'), addDoctorToTreatment);

router.route('/:id/doctors/:doctorId')
  .delete(authorize('ADMIN'), removeDoctorFromTreatment);

module.exports = router;