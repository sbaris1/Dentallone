const prisma = require('../utils/prismaClient');

// Get all doctors
const getDoctors = async (req, res) => {
  try {
    const { branchId, specialty, availability, search, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    if (branchId) filter.branchId = branchId;
    if (specialty) filter.specialty = specialty;
    if (availability) filter.availability = availability;

    if (search) {
      filter.OR = [
        { user: { firstName: { contains: search, mode: 'insensitive' } } },
        { user: { lastName: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { specialty: { contains: search, mode: 'insensitive' } }
      ];
    }

    const doctors = await prisma.doctor.findMany({
      where: filter,
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        branch: {
          select: {
            id: true,
            name: true
          }
        }
      },
      skip,
      take: parseInt(limit),
      orderBy: {
        user: {
          lastName: 'asc'
        }
      }
    });

    const total = await prisma.doctor.count({ where: filter });

    res.json({
      data: doctors,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get doctor by ID
const getDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        branch: true,
        treatments: {
          include: {
            treatment: true
          }
        },
        _count: {
          select: {
            appointments: true
          }
        }
      }
    });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    res.json(doctor);
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create doctor
const createDoctor = async (req, res) => {
  try {
    const { userId, specialty, availability, bio, branchId } = req.body;

    // Check if user exists and is not already a doctor
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        doctor: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.doctor) {
      return res.status(400).json({ message: 'User is already a doctor' });
    }

    // Check if branch exists
    const branchExists = await prisma.branch.findUnique({
      where: { id: branchId }
    });

    if (!branchExists) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    // Create doctor
    const doctor = await prisma.doctor.create({
      data: {
        userId,
        specialty,
        availability,
        bio,
        branchId
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        branch: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    // Update user role if not already DOCTOR
    if (user.role !== 'DOCTOR') {
      await prisma.user.update({
        where: { id: userId },
        data: { role: 'DOCTOR' }
      });
    }

    res.status(201).json(doctor);
  } catch (error) {
    console.error('Create doctor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update doctor
const updateDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const { specialty, availability, bio, rating, branchId } = req.body;

    // Check if doctor exists
    const doctorExists = await prisma.doctor.findUnique({
      where: { id }
    });

    if (!doctorExists) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if branch exists if provided
    if (branchId) {
      const branchExists = await prisma.branch.findUnique({
        where: { id: branchId }
      });

      if (!branchExists) {
        return res.status(404).json({ message: 'Branch not found' });
      }
    }

    // Update doctor
    const doctor = await prisma.doctor.update({
      where: { id },
      data: {
        specialty,
        availability,
        bio,
        rating,
        branchId
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true
          }
        },
        branch: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    res.json(doctor);
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete doctor
const deleteDoctor = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if doctor exists
    const doctor = await prisma.doctor.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            appointments: true,
            treatments: true
          }
        }
      }
    });

    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if doctor has associated appointments or treatments
    if (doctor._count.appointments > 0) {
      return res.status(400).json({
        message: 'Cannot delete doctor with associated appointments'
      });
    }

    // Delete doctor's treatment associations
    if (doctor._count.treatments > 0) {
      await prisma.treatmentDoctor.deleteMany({
        where: { doctorId: id }
      });
    }

    // Delete doctor
    await prisma.doctor.delete({
      where: { id }
    });

    res.json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    console.error('Delete doctor error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get doctor's appointments
const getDoctorAppointments = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, status, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // Check if doctor exists
    const doctorExists = await prisma.doctor.findUnique({
      where: { id }
    });

    if (!doctorExists) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Build filter object
    const filter = { doctorId: id };

    if (date) {
      const searchDate = new Date(date);
      filter.date = {
        gte: new Date(searchDate.setHours(0, 0, 0, 0)),
        lt: new Date(searchDate.setHours(23, 59, 59, 999))
      };
    }

    if (status) filter.status = status;

    const appointments = await prisma.appointment.findMany({
      where: filter,
      include: {
        patient: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true,
                email: true
              }
            }
          }
        },
        treatments: {
          include: {
            treatment: true
          }
        }
      },
      skip,
      take: parseInt(limit),
      orderBy: {
        date: 'asc'
      }
    });

    const total = await prisma.appointment.count({ where: filter });

    res.json({
      data: appointments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get doctor appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorAppointments
};