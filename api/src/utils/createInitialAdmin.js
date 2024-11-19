const User = require("../models/user.model");
const Employee = require("../models/employee.model");
const bcrypt = require("bcryptjs");

async function createInitialAdmin() {
  try {
    const adminExists = await User.findOne({ role: "Admin" });
    if (adminExists) {
      console.log("Admin user already exists");
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(process.env.INITIAL_ADMIN_PASSWORD || "changeThisPassword", salt);

    const admin = new User({
      username: "admin",
      email: process.env.INITIAL_ADMIN_EMAIL || "admin@remote360.com",
      password: hashedPassword,
      role: "Admin"
    });

    const adminEmployee = new Employee({
      user: admin._id,
      firstName: "Admin",
      lastName: "User",
      department: "IT",
      position: "Manager",
      hireDate: new Date()
    })

    await admin.save();
    await adminEmployee.save();
    console.log("Initial admin user created successfully");
  } catch (error) {
    console.error("Error creating initial admin:", error);
  }
}

module.exports = { createInitialAdmin };