const prisma = require('../utils/prismaClient');

// Get all treatments
const getTreatments = async (req, res) => {
  try {
    const { category, status, insuranceCovered, search, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    if (category) filter.category = category;
    if (status) filter.status = status;
    if (insuranceCovered !== undefined) filter.insuranceCovered = insuranceCovered === 'true';

    if (search) {
      filter.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    const treatments = await prisma.treatment.findMany({
      where: filter,
      include: {
        _count: {
          select: {
            doctors: true,
            appointmentTreatments: true,
            inventoryItems: true
          }
        }
      },
      skip,
      take: parseInt(limit),
      orderBy: {
        name: 'asc'
      }
    });

    const total = await prisma.treatment.count({ where: filter });

    res.json({
      data: treatments,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get treatments error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get treatment by ID
const getTreatment = async (req, res) => {
  try {
    const { id } = req.params;

    const treatment = await prisma.treatment.findUnique({
      where: { id },
      include: {
        doctors: {
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
            }
          }
        },
        inventoryItems: {
          include: {
            inventoryItem: true
          }
        },
        _count: {
          select: {
            appointmentTreatments: true
          }
        }
      }
    });

    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found' });
    }

    res.json(treatment);
  } catch (error) {
    console.error('Get treatment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create treatment
const createTreatment = async (req, res) => {
  try {
    const {
      name,
      category,
      description,
      duration,
      price,
      insuranceCovered,
      status,
      doctorIds,
      inventoryItems
    } = req.body;

    // Create treatment
    const treatment = await prisma.treatment.create({
      data: {
        name,
        category,
        description,
        duration,
        price,
        insuranceCovered,
        status
      }
    });

    // Add doctors if provided
    if (doctorIds && doctorIds.length > 0) {
      await Promise.all(
        doctorIds.map(doctorId =>
          prisma.treatmentDoctor.create({
            data: {
              treatmentId: treatment.id,
              doctorId
            }
          })
        )
      );
    }

    // Add inventory items if provided
    if (inventoryItems && inventoryItems.length > 0) {
      await Promise.all(
        inventoryItems.map(item =>
          prisma.treatmentInventory.create({
            data: {
              treatmentId: treatment.id,
              inventoryItemId: item.inventoryItemId,
              quantityRequired: item.quantityRequired
            }
          })
        )
      );
    }

    // Get the created treatment with relations
    const createdTreatment = await prisma.treatment.findUnique({
      where: { id: treatment.id },
      include: {
        doctors: {
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
            }
          }
        },
        inventoryItems: {
          include: {
            inventoryItem: true
          }
        }
      }
    });

    res.status(201).json(createdTreatment);
  } catch (error) {
    console.error('Create treatment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update treatment
const updateTreatment = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      description,
      duration,
      price,
      insuranceCovered,
      status,
      doctorIds,
      inventoryItems
    } = req.body;

    // Check if treatment exists
    const treatmentExists = await prisma.treatment.findUnique({
      where: { id }
    });

    if (!treatmentExists) {
      return res.status(404).json({ message: 'Treatment not found' });
    }

    // Update treatment
    const treatment = await prisma.treatment.update({
      where: { id },
      data: {
        name,
        category,
        description,
        duration,
        price,
        insuranceCovered,
        status
      }
    });

    // Update doctors if provided
    if (doctorIds) {
      // Delete existing doctor associations
      await prisma.treatmentDoctor.deleteMany({
        where: { treatmentId: id }
      });

      // Add new doctor associations
      if (doctorIds.length > 0) {
        await Promise.all(
          doctorIds.map(doctorId =>
            prisma.treatmentDoctor.create({
              data: {
                treatmentId: id,
                doctorId
              }
            })
          )
        );
      }
    }

    // Update inventory items if provided
    if (inventoryItems) {
      // Delete existing inventory associations
      await prisma.treatmentInventory.deleteMany({
        where: { treatmentId: id }
      });

      // Add new inventory associations
      if (inventoryItems.length > 0) {
        await Promise.all(
          inventoryItems.map(item =>
            prisma.treatmentInventory.create({
              data: {
                treatmentId: id,
                inventoryItemId: item.inventoryItemId,
                quantityRequired: item.quantityRequired
              }
            })
          )
        );
      }
    }

    // Get the updated treatment with relations
    const updatedTreatment = await prisma.treatment.findUnique({
      where: { id },
      include: {
        doctors: {
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
            }
          }
        },
        inventoryItems: {
          include: {
            inventoryItem: true
          }
        }
      }
    });

    res.json(updatedTreatment);
  } catch (error) {
    console.error('Update treatment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete treatment
const deleteTreatment = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if treatment exists
    const treatment = await prisma.treatment.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            appointmentTreatments: true
          }
        }
      }
    });

    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found' });
    }

    // Check if treatment is used in appointments
    if (treatment._count.appointmentTreatments > 0) {
      return res.status(400).json({
        message: 'Cannot delete treatment that is used in appointments. Set status to INACTIVE instead.'
      });
    }

    // Delete treatment associations first
    await prisma.treatmentDoctor.deleteMany({
      where: { treatmentId: id }
    });

    await prisma.treatmentInventory.deleteMany({
      where: { treatmentId: id }
    });

    // Delete treatment
    await prisma.treatment.delete({
      where: { id }
    });

    res.json({ message: 'Treatment deleted successfully' });
  } catch (error) {
    console.error('Delete treatment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add doctor to treatment
const addDoctorToTreatment = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorId } = req.body;

    // Check if treatment exists
    const treatmentExists = await prisma.treatment.findUnique({
      where: { id }
    });

    if (!treatmentExists) {
      return res.status(404).json({ message: 'Treatment not found' });
    }

    // Check if doctor exists
    const doctorExists = await prisma.doctor.findUnique({
      where: { id: doctorId }
    });

    if (!doctorExists) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if association already exists
    const associationExists = await prisma.treatmentDoctor.findUnique({
      where: {
        treatmentId_doctorId: {
          treatmentId: id,
          doctorId
        }
      }
    });

    if (associationExists) {
      return res.status(400).json({ message: 'Doctor is already assigned to this treatment' });
    }

    // Create association
    await prisma.treatmentDoctor.create({
      data: {
        treatmentId: id,
        doctorId
      }
    });

    // Get updated treatment with doctors
    const treatment = await prisma.treatment.findUnique({
      where: { id },
      include: {
        doctors: {
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
            }
          }
        }
      }
    });

    res.json(treatment);
  } catch (error) {
    console.error('Add doctor to treatment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove doctor from treatment
const removeDoctorFromTreatment = async (req, res) => {
  try {
    const { id, doctorId } = req.params;

    // Check if association exists
    const associationExists = await prisma.treatmentDoctor.findUnique({
      where: {
        treatmentId_doctorId: {
          treatmentId: id,
          doctorId
        }
      }
    });

    if (!associationExists) {
      return res.status(404).json({ message: 'Doctor is not assigned to this treatment' });
    }

    // Delete association
    await prisma.treatmentDoctor.delete({
      where: {
        treatmentId_doctorId: {
          treatmentId: id,
          doctorId
        }
      }
    });

    // Get updated treatment with doctors
    const treatment = await prisma.treatment.findUnique({
      where: { id },
      include: {
        doctors: {
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
            }
          }
        }
      }
    });

    res.json(treatment);
  } catch (error) {
    console.error('Remove doctor from treatment error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getTreatments,
  getTreatment,
  createTreatment,
  updateTreatment,
  deleteTreatment,
  addDoctorToTreatment,
  removeDoctorFromTreatment
};