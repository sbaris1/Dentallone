const prisma = require('../utils/prismaClient');

// Get all appointments
const getAppointments = async (req, res) => {
  try {
    const { date, doctorId, patientId, branchId, status, search, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    if (date) {
      const searchDate = new Date(date);
      filter.date = {
        gte: new Date(searchDate.setHours(0, 0, 0, 0)),
        lt: new Date(searchDate.setHours(23, 59, 59, 999))
      };
    }

    if (doctorId) filter.doctorId = doctorId;
    if (patientId) filter.patientId = patientId;
    if (branchId) filter.branchId = branchId;
    if (status) filter.status = status;

    if (search) {
      filter.OR = [
        { patient: { user: { firstName: { contains: search, mode: 'insensitive' } } } },
        { patient: { user: { lastName: { contains: search, mode: 'insensitive' } } } },
        { doctor: { user: { firstName: { contains: search, mode: 'insensitive' } } } },
        { doctor: { user: { lastName: { contains: search, mode: 'insensitive' } } } },
        { notes: { contains: search, mode: 'insensitive' } }
      ];
    }

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
        doctor: {
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
        branch: {
          select: {
            id: true,
            name: true
          }
        },
        treatments: {
          include: {
            treatment: {
              select: {
                id: true,
                name: true,
                price: true
              }
            }
          }
        },
        invoice: {
          select: {
            id: true,
            status: true
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
    console.error('Get appointments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get appointment by ID
const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await prisma.appointment.findUnique({
      where: { id },
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
        doctor: {
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
        branch: true,
        treatments: {
          include: {
            treatment: true
          }
        },
        invoice: true
      }
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    res.json(appointment);
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create appointment
const createAppointment = async (req, res) => {
  try {
    const { patientId, doctorId, branchId, date, duration, status, notes, treatments } = req.body;

    // Check if patient exists
    const patientExists = await prisma.patient.findUnique({
      where: { id: patientId }
    });

    if (!patientExists) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if doctor exists
    const doctorExists = await prisma.doctor.findUnique({
      where: { id: doctorId }
    });

    if (!doctorExists) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if branch exists
    const branchExists = await prisma.branch.findUnique({
      where: { id: branchId }
    });

    if (!branchExists) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    // Check for scheduling conflicts
    const appointmentDate = new Date(date);
    const endTime = new Date(appointmentDate.getTime() + duration * 60000);

    const conflictingAppointment = await prisma.appointment.findFirst({
      where: {
        doctorId,
        date: {
          lt: endTime
        },
        AND: {
          date: {
            gte: appointmentDate
          }
        }
      }
    });

    if (conflictingAppointment) {
      return res.status(400).json({ message: 'Doctor has a conflicting appointment at this time' });
    }

    // Create appointment
    const appointment = await prisma.appointment.create({
      data: {
        patientId,
        doctorId,
        branchId,
        date: appointmentDate,
        duration,
        status,
        notes
      }
    });

    // Add treatments if provided
    if (treatments && treatments.length > 0) {
      await Promise.all(
        treatments.map(treatmentId =>
          prisma.appointmentTreatment.create({
            data: {
              appointmentId: appointment.id,
              treatmentId
            }
          })
        )
      );
    }

    // Get the created appointment with relations
    const createdAppointment = await prisma.appointment.findUnique({
      where: { id: appointment.id },
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
        doctor: {
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
        branch: {
          select: {
            id: true,
            name: true
          }
        },
        treatments: {
          include: {
            treatment: true
          }
        }
      }
    });

    res.status(201).json(createdAppointment);
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update appointment
const updateAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const { patientId, doctorId, branchId, date, duration, status, notes, treatments } = req.body;

    // Check if appointment exists
    const appointmentExists = await prisma.appointment.findUnique({
      where: { id }
    });

    if (!appointmentExists) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check for scheduling conflicts if date or doctor is changing
    if ((date && new Date(date).getTime() !== new Date(appointmentExists.date).getTime()) ||
      (doctorId && doctorId !== appointmentExists.doctorId)) {

      const appointmentDate = date ? new Date(date) : appointmentExists.date;
      const appointmentDuration = duration || appointmentExists.duration;
      const endTime = new Date(appointmentDate.getTime() + appointmentDuration * 60000);
      const checkDoctorId = doctorId || appointmentExists.doctorId;

      const conflictingAppointment = await prisma.appointment.findFirst({
        where: {
          id: { not: id },
          doctorId: checkDoctorId,
          date: {
            lt: endTime
          },
          AND: {
            date: {
              gte: appointmentDate
            }
          }
        }
      });

      if (conflictingAppointment) {
        return res.status(400).json({ message: 'Doctor has a conflicting appointment at this time' });
      }
    }

    // Update appointment
    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        patientId,
        doctorId,
        branchId,
        date: date ? new Date(date) : undefined,
        duration,
        status,
        notes
      }
    });

    // Update treatments if provided
    if (treatments) {
      // Delete existing treatments
      await prisma.appointmentTreatment.deleteMany({
        where: { appointmentId: id }
      });

      // Add new treatments
      if (treatments.length > 0) {
        await Promise.all(
          treatments.map(treatmentId =>
            prisma.appointmentTreatment.create({
              data: {
                appointmentId: id,
                treatmentId
              }
            })
          )
        );
      }
    }

    // Get the updated appointment with relations
    const updatedAppointment = await prisma.appointment.findUnique({
      where: { id },
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
        doctor: {
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
        branch: {
          select: {
            id: true,
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
            status: true
          }
        }
      }
    });

    res.json(updatedAppointment);
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete appointment
const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if appointment exists
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        invoice: true
      }
    });

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }

    // Check if appointment has an invoice
    if (appointment.invoice) {
      return res.status(400).json({
        message: 'Cannot delete appointment with an associated invoice. Cancel the appointment instead.'
      });
    }

    // Delete appointment treatments first (due to foreign key constraints)
    await prisma.appointmentTreatment.deleteMany({
      where: { appointmentId: id }
    });

    // Delete appointment
    await prisma.appointment.delete({
      where: { id }
    });

    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  deleteAppointment
};