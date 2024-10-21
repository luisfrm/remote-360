const Employee = require('../models/employee.model');

class EmployeeController {
  static async getAllEmployees(req, res) {
    try {
      const employees = await Employee.find().populate('user', 'email');
      res.json(employees);
    } catch (error) {
      console.error('Error fetching employees:', error);
      res.status(500).json({ message: 'Error fetching employees' });
    }
  }

  static async getEmployeeById(req, res) {
    try {
      const employee = await Employee.findById(req.params.id).populate('user', 'email');
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(employee);
    } catch (error) {
      console.error('Error fetching employee:', error);
      res.status(500).json({ message: 'Error fetching employee' });
    }
  }

  static async updateEmployee(req, res) {
    try {
      const { firstName, lastName, department, position } = req.body;
      const employee = await Employee.findByIdAndUpdate(
        req.params.id,
        { firstName, lastName, department, position },
        { new: true }
      );
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json(employee);
    } catch (error) {
      console.error('Error updating employee:', error);
      res.status(500).json({ message: 'Error updating employee' });
    }
  }

  static async deleteEmployee(req, res) {
    try {
      const employee = await Employee.findByIdAndDelete(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
      console.error('Error deleting employee:', error);
      res.status(500).json({ message: 'Error deleting employee' });
    }
  }
}

module.exports = EmployeeController;