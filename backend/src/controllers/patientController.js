const prisma = require('../utils/prismaClient');

// Get all patients
const getPatients = async (req, res) => {
  try {
    const { branchId, gender, search, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    if (branchId) filter.branchId = branchId;
    if (gender) filter.gender = gender;

    if (search) {
      filter.OR = [
        { user: { firstName: { contains: search, mode: 'insensitive' } } },
        { user: { lastName: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
        { phone: { contains: search, mode: 'insensitive' } }
      ];
    }

    const patients = await prisma.patient.findMany({
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

    const total = await prisma.patient.count({ where: filter });

    res.json({
      data: patients,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get patient by ID
const getPatient = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await prisma.patient.findUnique({
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
        _count: {
          select: {
            appointments: true,
            invoices: true
          }
        }
      }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (error) {
    console.error('Get patient error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create patient
const createPatient = async (req, res) => {
  try {
    const {
      userId,
      dateOfBirth,
      gender,
      phone,
      address,
      emergencyContact,
      medicalHistory,
      insuranceInfo,
      branchId
    } = req.body;

    // Check if user exists and is not already a patient
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        patient: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.patient) {
      return res.status(400).json({ message: 'User is already a patient' });
    }

    // Check if branch exists
    const branchExists = await prisma.branch.findUnique({
      where: { id: branchId }
    });

    if (!branchExists) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    // Create patient
    const patient = await prisma.patient.create({
      data: {
        userId,
        dateOfBirth: new Date(dateOfBirth),
        gender,
        phone,
        address,
        emergencyContact,
        medicalHistory,
        insuranceInfo,
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

    // Update user role if not already PATIENT
    if (user.role !== 'PATIENT') {
      await prisma.user.update({
        where: { id: userId },
        data: { role: 'PATIENT' }
      });
    }

    res.status(201).json(patient);
  } catch (error) {
    console.error('Create patient error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update patient
const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      dateOfBirth,
      gender,
      phone,
      address,
      emergencyContact,
      medicalHistory,
      insuranceInfo,
      branchId
    } = req.body;

    // Check if patient exists
    const patientExists = await prisma.patient.findUnique({
      where: { id }
    });

    if (!patientExists) {
      return res.status(404).json({ message: 'Patient not found' });
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

    // Update patient
    const patient = await prisma.patient.update({
      where: { id },
      data: {
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
        gender,
        phone,
        address,
        emergencyContact,
        medicalHistory,
        insuranceInfo,
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

    res.json(patient);
  } catch (error) {
    console.error('Update patient error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete patient
const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if patient exists
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            appointments: true,
            invoices: true
          }
        }
      }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if patient has associated appointments or invoices
    if (patient._count.appointments > 0 || patient._count.invoices > 0) {
      return res.status(400).json({
        message: 'Cannot delete patient with associated appointments or invoices'
      });
    }

    // Delete patient
    await prisma.patient.delete({
      where: { id }
    });

    res.json({ message: 'Patient deleted successfully' });
  } catch (error) {
    console.error('Delete patient error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get patient's appointments
const getPatientAppointments = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, status, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // Check if patient exists
    const patientExists = await prisma.patient.findUnique({
      where: { id }
    });

    if (!patientExists) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Build filter object
    const filter = { patientId: id };

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
        doctor: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        },
        branch: {
          select: {
            name: true
          }
        },
        treatments: {
          include: {
            treatment: true
          }
        },
        invoice: {
          select: {
            id: true,
            status: true,
            totalAmount: true
          }
        }
      },
      skip,
      take: parseInt(limit),
      orderBy: {
        date: 'desc'
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
    console.error('Get patient appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get patient's invoices
const getPatientInvoices = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // Check if patient exists
    const patientExists = await prisma.patient.findUnique({
      where: { id }
    });

    if (!patientExists) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Build filter object
    const filter = { patientId: id };

    if (status) filter.status = status;

    const invoices = await prisma.invoice.findMany({
      where: filter,
      include: {
        appointment: {
          select: {
            id: true,
            date: true,
            treatments: {
              include: {
                treatment: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      },
      skip,
      take: parseInt(limit),
      orderBy: {
        createdAt: 'desc'
      }
    });

    const total = await prisma.invoice.count({ where: filter });

    res.json({
      data: invoices,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get patient invoices error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getPatients,
  getPatient,
  createPatient,
  updatePatient,
  deletePatient,
  getPatientAppointments,
  getPatientInvoices
};