const prisma = require('../utils/prismaClient');

// Get all inventory items
const getInventoryItems = async (req, res) => {
  try {
    const { branchId, category, status, search, page = 1, limit = 10 } = req.query;

    const skip = (page - 1) * limit;

    // Build filter object
    const filter = {};

    if (branchId) filter.branchId = branchId;
    if (category) filter.category = category;
    if (status) filter.status = status;

    if (search) {
      filter.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
        { supplier: { contains: search, mode: 'insensitive' } }
      ];
    }

    const inventoryItems = await prisma.inventoryItem.findMany({
      where: filter,
      include: {
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
        name: 'asc'
      }
    });

    const total = await prisma.inventoryItem.count({ where: filter });

    res.json({
      data: inventoryItems,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get inventory items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get inventory item by ID
const getInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;

    const inventoryItem = await prisma.inventoryItem.findUnique({
      where: { id },
      include: {
        branch: true,
        treatments: {
          include: {
            treatment: {
              select: {
                id: true,
                name: true,
                category: true
              }
            }
          }
        }
      }
    });

    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    res.json(inventoryItem);
  } catch (error) {
    console.error('Get inventory item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create inventory item
const createInventoryItem = async (req, res) => {
  try {
    const {
      name,
      category,
      quantity,
      unit,
      minStock,
      price,
      supplier,
      expiryDate,
      branchId,
      status
    } = req.body;

    // Check if branch exists
    const branchExists = await prisma.branch.findUnique({
      where: { id: branchId }
    });

    if (!branchExists) {
      return res.status(404).json({ message: 'Branch not found' });
    }

    // Create inventory item
    const inventoryItem = await prisma.inventoryItem.create({
      data: {
        name,
        category,
        quantity,
        unit,
        minStock,
        price,
        supplier,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        branchId,
        status: status || 'IN_STOCK'
      },
      include: {
        branch: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    res.status(201).json(inventoryItem);
  } catch (error) {
    console.error('Create inventory item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update inventory item
const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      category,
      quantity,
      unit,
      minStock,
      price,
      supplier,
      expiryDate,
      branchId,
      status
    } = req.body;

    // Check if inventory item exists
    const inventoryItemExists = await prisma.inventoryItem.findUnique({
      where: { id }
    });

    if (!inventoryItemExists) {
      return res.status(404).json({ message: 'Inventory item not found' });
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

    // Update inventory item status based on quantity and minStock
    let calculatedStatus = status;

    if (quantity !== undefined && minStock !== undefined) {
      if (quantity <= 0) {
        calculatedStatus = 'OUT_OF_STOCK';
      } else if (quantity <= minStock) {
        calculatedStatus = 'LOW_STOCK';
      } else {
        calculatedStatus = 'IN_STOCK';
      }
    } else if (quantity !== undefined) {
      if (quantity <= 0) {
        calculatedStatus = 'OUT_OF_STOCK';
      } else if (quantity <= inventoryItemExists.minStock) {
        calculatedStatus = 'LOW_STOCK';
      } else {
        calculatedStatus = 'IN_STOCK';
      }
    } else if (minStock !== undefined) {
      if (inventoryItemExists.quantity <= 0) {
        calculatedStatus = 'OUT_OF_STOCK';
      } else if (inventoryItemExists.quantity <= minStock) {
        calculatedStatus = 'LOW_STOCK';
      } else {
        calculatedStatus = 'IN_STOCK';
      }
    }

    // Update inventory item
    const inventoryItem = await prisma.inventoryItem.update({
      where: { id },
      data: {
        name,
        category,
        quantity,
        unit,
        minStock,
        price,
        supplier,
        expiryDate: expiryDate ? new Date(expiryDate) : undefined,
        branchId,
        status: calculatedStatus || status
      },
      include: {
        branch: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    res.json(inventoryItem);
  } catch (error) {
    console.error('Update inventory item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete inventory item
const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if inventory item exists
    const inventoryItem = await prisma.inventoryItem.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            treatments: true
          }
        }
      }
    });

    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }

    // Check if inventory item is used in treatments
    if (inventoryItem._count.treatments > 0) {
      return res.status(400).json({
        message: 'Cannot delete inventory item that is used in treatments'
      });
    }

    // Delete inventory item
    await prisma.inventoryItem.delete({
      where: { id }
    });

    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Delete inventory item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getInventoryItems,
  getInventoryItem,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem
};