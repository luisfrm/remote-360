const Department = require("../models/department.model");
const Employee = require("../models/employee.model");

class DepartmentController {
  static create = async (req, res) => {
    try {
      const { name, description } = req.body;

      const existingDepartment = await Department.findOne({ name });

      if (existingDepartment) return res.status(400).json({ message: "Department already exists" });
      
      const department = new Department({
        name,
        description
      });

      await department.save();

      res.status(201).json({ message: "Department created successfully" });
    } catch (error) {
      console.error("Error creating department:", error);
      res.status(500).json({ message: "Error creating department" });
    }
  }

  static getAll = async (req, res) => {
    try {
      const query = req.query;

      if (query.name) {
        const department = await Department.find({
					name: { $regex: query.name, $options: "i" },
				});

        return res.status(200).json(department);
      }

      const departments = await Department.find();

      res.status(200).json(departments);
    } catch (error) {
      console.error("Error getting departments:", error);
      res.status(500).json({ message: "Error getting departments" });
    }
  }

  static update = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const department = await Department.findById(id);

      if (!department) return res.status(404).json({ message: "Department not found" });

      department.name = name;
      department.description = description;
      department.updatedAt = Date.now();

      await department.save();

      res.status(200).json({ message: "Department updated successfully" });
    } catch (error) {
      console.error("Error updating department:", error);
      res.status(500).json({ message: "Error updating department" });
    }
  }

  static delete = async (req, res) => {
		try {
			const { id } = req.params;

			const department = await Department.findById(id);

			if (!department)
				return res.status(404).json({ message: "Department not found" });

			await department.remove();

			res.status(200).json({ message: "Department deleted successfully" });
		} catch (error) {
			console.error("Error deleting department:", error);
			res.status(500).json({ message: "Error deleting department" });
		}
	}

  static getDepartment = async (req, res) => {
		try {
			const { id } = req.params;

			const department = await Department.findById(id);

			if (!department)
				return res.status(404).json({ message: "Department not found" });

			res.status(200).json(department);
		} catch (error) {
			console.error("Error getting department:", error);
			res.status(500).json({ message: "Error getting department" });
		}
	}

  static getEmployeesByDepartment = async (req, res) => {
		try {
			const { id } = req.params;

			const department = await departmentModel.findById(id);

			if (!department) return res.status(404).json({ message: "Department not found" });

			const employees = await Employee.find({ department: id });

			res.status(200).json(employees);
		} catch (error) {
			console.error("Error getting employees by department:", error);
			res.status(500).json({ message: "Error getting employees by department" });
		}
	}
}

module.exports = DepartmentController;