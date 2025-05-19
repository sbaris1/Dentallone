const prisma = require('../utils/prismaClient');

// Get all invoices
const getInvoices = async (req, res) => {
  try {
    const { patientId, branchId, status, paymentMethod, search, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    if (patientId) filter.patientId = patientId;
    if (branchId) filter.branchId = branchId;
    if (status) filter.status = status;
    if (paymentMethod) filter.paymentMethod = paymentMethod;

    if (search) {
      filter.OR = [
        { invoiceNumber: { contains: search, mode: 'insensitive' } },
        { patient: { user: { firstName: { contains: search, mode: 'insensitive' } } } },
        { patient: { user: { lastName: { contains: search, mode: 'insensitive' } } } },
        { notes: { contains: search, mode: 'insensitive' } }
      ];
    }

    const invoices = await prisma.invoice.findMany({
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
        appointment: {
          select: {
            id: true,
            date: true,
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
    console.error('Get invoices error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get invoice by ID
const getInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    const invoice = await prisma.invoice.findUnique({
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
        appointment: {
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
            treatments: {
              include: {
                treatment: true
              }
            }
          }
        },
        branch: true
      }
    });

    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    res.json(invoice);
  } catch (error) {
    console.error('Get invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create invoice
const createInvoice = async (req, res) => {
  try {
    const {
      invoiceNumber,
      patientId,
      appointmentId,
      branchId,
      amount,
      tax,
      discount,
      totalAmount,
      status,
      paymentMethod,
      dueDate,
      notes
    } = req.body;

    // Check if patient exists
    const patientExists = await prisma.patient.findUnique({
      where: { id: patientId }
    });

    if (!patientExists) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if branch exists
    const branchExists = await prisma.branch.findUnique({
      where: { id: branchId }
    });

    if (!branchExists) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    // Check if appointment exists and doesn't already have an invoice
    if (appointmentId) {
      const appointment = await prisma.appointment.findUnique({
        where: { id: appointmentId },
        include: { invoice: true }
      });

      if (!appointment) {
        return res.status(404).json({ message: 'Appointment not found' });
      }

      if (appointment.invoice) {
        return res.status(400).json({ message: 'Appointment already has an invoice' });
      }

      // Check if appointment belongs to the patient
      if (appointment.patientId !== patientId) {
        return res.status(400).json({ message: 'Appointment does not belong to this patient' });
      }
    }

    // Check if invoice number is unique
    const invoiceExists = await prisma.invoice.findUnique({
      where: { invoiceNumber }
    });

    if (invoiceExists) {
      return res.status(400).json({ message: 'Invoice number already exists' });
    }

    // Create invoice
    const invoice = await prisma.invoice.create({
      data: {
        invoiceNumber,
        patientId,
        appointmentId,
        branchId,
        amount,
        tax,
        discount,
        totalAmount,
        status,
        paymentMethod,
        dueDate: new Date(dueDate),
        notes
      },
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
        appointment: {
          select: {
            id: true,
            date: true
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

    res.status(201).json(invoice);
  } catch (error) {
    console.error('Create invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update invoice
const updateInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      amount,
      tax,
      discount,
      totalAmount,
      status,
      paymentMethod,
      dueDate,
      notes
    } = req.body;

    // Check if invoice exists
    const invoiceExists = await prisma.invoice.findUnique({
      where: { id }
    });

    if (!invoiceExists) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Update invoice
    const invoice = await prisma.invoice.update({
      where: { id },
      data: {
        amount,
        tax,
        discount,
        totalAmount,
        status,
        paymentMethod,
        dueDate: dueDate ? new Date(dueDate) : undefined,
        notes
      },
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
        appointment: {
          select: {
            id: true,
            date: true
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

    res.json(invoice);
  } catch (error) {
    console.error('Update invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete invoice
const deleteInvoice = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if invoice exists
    const invoiceExists = await prisma.invoice.findUnique({
      where: { id }
    });

    if (!invoiceExists) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    // Delete invoice
    await prisma.invoice.delete({
      where: { id }
    });

    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Delete invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getInvoices,
  getInvoice,
  createInvoice,
  updateInvoice,
  deleteInvoice
};