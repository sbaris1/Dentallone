const prisma = require('../utils/prismaClient');

// Get all branches
const getBranches = async (req, res) => {
  try {
    const { status, search, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (search) {
      filter.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } }
      ];
    }

    const branches = await prisma.branch.findMany({
      where: filter,
      skip,
      take: parseInt(limit),
      orderBy: {
        name: 'asc'
      }
    });

    const total = await prisma.branch.count({ where: filter });

    res.json({
      data: branches,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get branches error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get branch by ID
const getBranch = async (req, res) => {
  try {
    const { id } = req.params;

    const branch = await prisma.branch.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            doctors: true,
            patients: true,
            appointments: true
          }
        }
      }
    });

    if (!branch) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    res.json(branch);
  } catch (error) {
    console.error('Get branch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create branch
const createBranch = async (req, res) => {
  try {
    const { name, address, phone, email, status } = req.body;

    // Create branch
    const branch = await prisma.branch.create({
      data: {
        name,
        address,
        phone,
        email,
        status
      }
    });

    res.status(201).json(branch);
  } catch (error) {
    console.error('Create branch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update branch
const updateBranch = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone, email, status } = req.body;

    // Check if branch exists
    const branchExists = await prisma.branch.findUnique({
      where: { id }
    });

    if (!branchExists) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    // Update branch
    const branch = await prisma.branch.update({
      where: { id },
      data: {
        name,
        address,
        phone,
        email,
        status
      }
    });

    res.json(branch);
  } catch (error) {
    console.error('Update branch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete branch
const deleteBranch = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if branch exists
    const branchExists = await prisma.branch.findUnique({
      where: { id }
    });

    if (!branchExists) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    // Check if branch has associated records
    const branchCounts = await prisma.branch.findUnique({
      where: { id },
      select: {
        _count: {
          select: {
            doctors: true,
            patients: true,
            appointments: true,
            inventory: true,
            invoices: true
          }
        }
      }
    });

    const totalAssociations =
      branchCounts._count.doctors +
      branchCounts._count.patients +
      branchCounts._count.appointments +
      branchCounts._count.inventory +
      branchCounts._count.invoices;

    if (totalAssociations > 0) {
      return res.status(400).json({
        message: 'Cannot delete branch with associated records. Update branch status to INACTIVE instead.'
      });
    }

    // Delete branch
    await prisma.branch.delete({
      where: { id }
    });

    res.json({ message: 'Branch deleted successfully' });
  } catch (error) {
    console.error('Delete branch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getBranches,
  getBranch,
  createBranch,
  updateBranch,
  deleteBranch
};