const mongoose = require('mongoose');
const User = require('../models/user.model');
const Employee = require('../models/employee.model');
const jwt = require('../utils/jwt');

class UserController {
  static async register(req, res) {
    try {
      const { email, password, role } = req.body;
      const user = new User({ email, password, role });
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
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      const token = jwt.generateToken(user);
      res.json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Error logging in' });
    }
  }

  static async createUserAndEmployee(req, res) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const { email, password, firstName, lastName, department, position } = req.body;

      const user = new User({ email, password, role: 'Employee' });
      await user.save({ session });

      const employee = new Employee({
        user: user._id,
        firstName,
        lastName,
        department,
        position
      });
      await employee.save({ session });

      await session.commitTransaction();
      session.endSession();

      res.status(201).json({ 
        message: 'User and employee created successfully', 
        userId: user._id, 
        employeeId: employee._id 
      });

    } catch (error) {
      await session.abortTransaction();
      session.endSession();

      console.error('Error creating user and employee:', error);
      res.status(500).json({ message: 'Error creating user and employee' });
    }
  }

  static async logout(req, res) {
    // Note: JWT tokens are stateless, so we can't invalidate them on the server.
    // The client is responsible for removing the token.
    res.json({ message: 'Logout successful' });
  }

  static async updateNotificationPreference(req, res) {
    try {
      const { userId } = req.user;
      const { preference } = req.body;

      const user = await User.findByIdAndUpdate(
        userId,
        { notificationPreference: preference },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({ message: 'Notification preference updated', preference: user.notificationPreference });
    } catch (error) {
      console.error('Error updating notification preference:', error);
      res.status(500).json({ message: 'Error updating notification preference' });
    }
  }
}

module.exports = UserController;