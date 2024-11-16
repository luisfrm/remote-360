const Department = require("../models/departament.model");
const Employee = require("../models/employee.model");

class DepartamentController {
  static create = async (req, res) => {
    try {
      const { name, description } = req.body;

      const existingDepartament = await Department.findOne({ name });

      if (existingDepartament) return res.status(400).json({ message: "Departament already exists" });
      
      const departament = new Department({
        name,
        description
      });

      await departament.save();

      res.status(201).json({ message: "Departament created successfully" });
    } catch (error) {
      console.error("Error creating departament:", error);
      res.status(500).json({ message: "Error creating departament" });
    }
  }

  static getAll = async (req, res) => {
    try {
      const query = req.query;

      if (query.name) {
        const departament = await Department.find({
					name: { $regex: query.name, $options: "i" },
				});

        return res.status(200).json(departament);
      }

      const departaments = await Department.find();

      res.status(200).json(departaments);
    } catch (error) {
      console.error("Error getting departaments:", error);
      res.status(500).json({ message: "Error getting departaments" });
    }
  }

  static update = async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description } = req.body;

      const departament = await Department.findById(id);

      if (!departament) return res.status(404).json({ message: "Departament not found" });

      departament.name = name;
      departament.description = description;
      departament.updatedAt = Date.now();

      await departament.save();

      res.status(200).json({ message: "Departament updated successfully" });
    } catch (error) {
      console.error("Error updating departament:", error);
      res.status(500).json({ message: "Error updating departament" });
    }
  }

  static delete = async (req, res) => {
		try {
			const { id } = req.params;

			const departament = await Department.findById(id);

			if (!departament)
				return res.status(404).json({ message: "Departament not found" });

			await departament.remove();

			res.status(200).json({ message: "Departament deleted successfully" });
		} catch (error) {
			console.error("Error deleting departament:", error);
			res.status(500).json({ message: "Error deleting departament" });
		}
	}

  static getDepartament = async (req, res) => {
		try {
			const { id } = req.params;

			const departament = await Department.findById(id);

			if (!departament)
				return res.status(404).json({ message: "Departament not found" });

			res.status(200).json(departament);
		} catch (error) {
			console.error("Error getting departament:", error);
			res.status(500).json({ message: "Error getting departament" });
		}
	}

  static getEmployeesByDepartment = async (req, res) => {
		try {
			const { id } = req.params;

			const department = await departamentModel.findById(id);

			if (!department) return res.status(404).json({ message: "Department not found" });

			const employees = await Employee.find({ department: id });

			res.status(200).json(employees);
		} catch (error) {
			console.error("Error getting employees by department:", error);
			res.status(500).json({ message: "Error getting employees by department" });
		}
	}
}

module.exports = DepartamentController;