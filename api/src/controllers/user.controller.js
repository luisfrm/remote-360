const mongoose = require('mongoose');
const User = require('../models/user.model');
const Employee = require('../models/employee.model');
const bcrypt = require('bcryptjs');
const { generateJwt } = require('../utils/jwt');

class UserController {
  static async register(req, res) {
    try {
      const { email, password, role } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({
        email,
        password: hashedPassword,
        role
      });

      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = generateJwt({
        userId: user._id,
        role: user.role,
        username: user.username
      });

      const userResponse = {
        id: user._id,
        role: user.role,
        username: user.username,
        email: user.email
      }

      res.json({ token, user: userResponse});
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  }

  static async createUserAndEmployee(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();
  
    try {
      const { 
        username, email, password, role, 
        firstName, lastName, department, position, 
        hireDate 
      } = req.body;
  
      // Verify role
      if (!['Admin', 'Manager', 'Employee'].includes(role)) {
        res.status(400).json({ message: 'Invalid role' });
      }
  
      // Check if user is manager or admin
      const isManager = role === 'Manager' || role === 'Admin';
  
      // Create user
      const user = new User({ username, email, password, role });
      await user.save({ session });
  
      // Verify if exists a manager for the department
      const existingManager = await Employee.findOne({ 
        department, 
        isManager: true 
      }).session(session);
  
      let managerToAssign = null;
  
      if (isManager) {
        if (existingManager) {
          res.status(400).json({ message: 'There is already a manager for this department' });
        }
      } else {
        managerToAssign = existingManager ? existingManager._id : null;
      }
  
      // Crear el empleado
      const employee = new Employee({
        user: user._id,
        firstName,
        lastName,
        department,
        position,
        hireDate,
        isManager,
        manager: managerToAssign
      });
  
      await employee.save({ session });
  
      // Si es un manager, actualizar a los empleados del departamento
      if (isManager) {
        await Employee.updateMany(
          { department, _id: { $ne: employee._id } },
          { $set: { manager: employee._id } },
          { session }
        );
      }
  
      await session.commitTransaction();
      session.endSession();
  
      res.status(201).json({ 
        message: "Usuario y empleado creados exitosamente", 
        userId: user._id, 
        employeeId: employee._id,
        role: user.role,
        isManager: employee.isManager
      });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      res.status(400).json({ message: error.message });
    }
  };

  static async getProfile(req, res) {
    try {
      const { userId } = req.user;

      const user = await User.findById(userId).select('-password');
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      const employee = await Employee.findOne({ user: userId });
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      res.json({ user, employee });
    } catch (error) {
      console.error('Error getting user profile:', error);
      res.status(500).json({ message: 'Error getting user profile' });
    }
  }

  static async updateProfile(req, res) {
    try {
      const { userId } = req.user;
      const { email, firstName, lastName, department, position, notificationPreference } = req.body;

      // Verificar si el email ya existe (si se está actualizando)
      if (email) {
        const existingUser = await User.findOne({ email, _id: { $ne: userId } });
        if (existingUser) {
          return res.status(400).json({ message: 'Email already in use' });
        }
      }

      // Actualizar usuario
      const user = await User.findByIdAndUpdate(
        userId,
        { 
          email, 
          notificationPreference
        },
        { new: true }
      ).select('-password');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Actualizar empleado
      const employee = await Employee.findOneAndUpdate(
        { user: userId },
        { firstName, lastName, department, position },
        { new: true }
      );

      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      res.json({ message: 'Profile updated successfully', user, employee });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({ message: 'Error updating user profile' });
    }
  }

  static async updatePassword(req, res) {
    try {
      const { userId } = req.user;
      const { currentPassword, newPassword } = req.body;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Verificar la contraseña actual
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password is incorrect' });
      }

      // Hashear la nueva contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      // Actualizar la contraseña
      user.password = hashedPassword;
      await user.save();

      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Error updating password:', error);
      res.status(500).json({ message: 'Error updating password' });
    }
  }
}

module.exports = UserController;