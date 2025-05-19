// authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../utils/prismaClient');

// Register user
const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName, role, ...additionalData } = req.body;

    // Check if user already exists
    const userExists = await prisma.user.findUnique({
      where: { email }
    });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Check if this is the first user (system initialization)
    const userCount = await prisma.user.count();
    const isFirstUser = userCount === 0;

    // If this is the first user, force role to be ADMIN
    const effectiveRole = isFirstUser ? 'ADMIN' : role;

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: effectiveRole
      }
    });

    // If this is the first user (admin), create a default branch
    let defaultBranch = null;
    if (isFirstUser) {
      defaultBranch = await prisma.branch.create({
        data: {
          name: 'Main Branch',
          address: '123 Dental Street, Medical City',
          phone: '555-123-4567',
          email: 'main@dentallone.com',
          status: 'ACTIVE'
        }
      });
    } else {
      // For non-first users, try to find an existing branch
      defaultBranch = await prisma.branch.findFirst({
        where: { status: 'ACTIVE' }
      });
    }

    // Create role-specific records
    let roleSpecificData = null;

    if (effectiveRole === 'DOCTOR') {
      // Create doctor profile
      roleSpecificData = await prisma.doctor.create({
        data: {
          userId: user.id,
          specialty: additionalData.specialty || 'General Dentist',
          availability: additionalData.availability || 'FULL_TIME',
          bio: additionalData.bio || '',
          branchId: defaultBranch?.id || null
        }
      });
    } else if (effectiveRole === 'PATIENT') {
      // Create patient profile
      roleSpecificData = await prisma.patient.create({
        data: {
          userId: user.id,
          dateOfBirth: additionalData.dateOfBirth ? new Date(additionalData.dateOfBirth) : new Date(),
          gender: additionalData.gender || 'OTHER',
          phone: additionalData.phone || '',
          address: additionalData.address || '',
          emergencyContact: additionalData.emergencyContact || '',
          medicalHistory: additionalData.medicalHistory || '',
          insuranceInfo: additionalData.insuranceInfo || '',
          branchId: defaultBranch?.id || null
        }
      });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, role: effectiveRole },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: effectiveRole,
      roleSpecificId: roleSpecificData?.id,
      isFirstUser,
      defaultBranchId: defaultBranch?.id,
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        doctor: { select: { id: true } },
        patient: { select: { id: true } }
      }
    });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Get role-specific ID
    let roleSpecificId = null;
    if (user.role === 'DOCTOR' && user.doctor) {
      roleSpecificId = user.doctor.id;
    } else if (user.role === 'PATIENT' && user.patient) {
      roleSpecificId = user.patient.id;
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      roleSpecificId,
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get current user
const getMe = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        createdAt: true,
        updatedAt: true,
        doctor: true,
        patient: true
      }
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, getMe };