const Evaluation = require('../models/evaluation.model');
const MasterEvaluation = require('../models/masterEvaluation.model');
const Employee = require('../models/employee.model');

class EvaluationController {
  static async initiate360Evaluation(req, res) {
    try {
      const { employeeId, period, categories, deadline } = req.body;
      const initiator = req.user.userId;

      const employee = await Employee.findById(employeeId);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }

      const masterEvaluation = new MasterEvaluation({
        employee: employeeId,
        initiator,
        period,
        categories,
        deadline,
      });
      await masterEvaluation.save();

      const peers = await Employee.find({ department: employee.department, _id: { $ne: employeeId } });
      const subordinates = await Employee.find({ manager: employeeId });
      const supervisor = await Employee.findById(employee.manager);

      const evaluations = [
        new Evaluation({
          employee: employeeId,
          evaluator: employeeId,
          evaluationType: 'Self',
          masterEvaluation: masterEvaluation._id,
          categories: categories.map(cat => ({ name: cat.name, score: null })),
        }),
        ...peers.map(peer => new Evaluation({
          employee: employeeId,
          evaluator: peer._id,
          evaluationType: 'Peer',
          masterEvaluation: masterEvaluation._id,
          categories: categories.map(cat => ({ name: cat.name, score: null })),
        })),
        ...subordinates.map(sub => new Evaluation({
          employee: employeeId,
          evaluator: sub._id,
          evaluationType: 'Subordinate',
          masterEvaluation: masterEvaluation._id,
          categories: categories.map(cat => ({ name: cat.name, score: null })),
        })),
        ...(supervisor && supervisor._id.toString() !== initiator.toString() ? [new Evaluation({
          employee: employeeId,
          evaluator: supervisor._id,
          evaluationType: 'Supervisor',
          masterEvaluation: masterEvaluation._id,
          categories: categories.map(cat => ({ name: cat.name, score: null })),
        })] : [])
      ];

      await Evaluation.insertMany(evaluations);

      res.status(201).json({ 
        message: '360 Evaluation process initiated successfully', 
        masterEvaluationId: masterEvaluation._id 
      });
    } catch (error) {
      console.error('Error initiating 360 evaluation:', error);
      res.status(500).json({ message: 'Error initiating 360 evaluation' });
    }
  }

  static async get360EvaluationStatus(req, res) {
    try {
      const { masterEvaluationId } = req.params;
      const masterEvaluation = await MasterEvaluation.findById(masterEvaluationId);
      if (!masterEvaluation) {
        return res.status(404).json({ message: 'Master evaluation not found' });
      }

      const evaluations = await Evaluation.find({ masterEvaluation: masterEvaluationId })
        .populate('evaluator', 'firstName lastName')
        .select('evaluator evaluationType status');
      
      res.status(200).json({
        masterEvaluation,
        evaluations
      });
    } catch (error) {
      console.error('Error fetching 360 evaluation status:', error);
      res.status(500).json({ message: 'Error fetching 360 evaluation status' });
    }
  }

  static async submit360Evaluation(req, res) {
    try {
      const { evaluationId } = req.params;
      const { categories, overallScore, comments } = req.body;
      const evaluator = req.user.userId;

      const evaluation = await Evaluation.findOneAndUpdate(
        { _id: evaluationId, evaluator: evaluator },
        { 
          categories, 
          overallScore, 
          comments, 
          status: 'Completed',
          updatedAt: Date.now()
        },
        { new: true }
      );

      if (!evaluation) {
        return res.status(404).json({ message: 'Evaluation not found or you are not authorized to update it' });
      }

      const allEvaluations = await Evaluation.find({ masterEvaluation: evaluation.masterEvaluation });
      const allCompleted = allEvaluations.every(evaluation => evaluation.status === 'Completed');

      if (allCompleted) {
        await MasterEvaluation.findByIdAndUpdate(evaluation.masterEvaluation, { status: 'Completed' });
      }

      res.status(200).json({ message: 'Evaluation submitted successfully', evaluation });
    } catch (error) {
      console.error('Error submitting 360 evaluation:', error);
      res.status(500).json({ message: 'Error submitting 360 evaluation' });
    }
  }

  static async generate360Report(req, res) {
    try {
      const { masterEvaluationId } = req.params;
      const masterEvaluation = await MasterEvaluation.findById(masterEvaluationId).populate('employee', 'firstName lastName');
      if (!masterEvaluation) {
        return res.status(404).json({ message: 'Master evaluation not found' });
      }

      const evaluations = await Evaluation.find({ masterEvaluation: masterEvaluationId })
        .populate('evaluator', 'firstName lastName');

      if (evaluations.length === 0) {
        return res.status(404).json({ message: 'No evaluations found for this 360 process' });
      }

      const report = {
        employee: `${masterEvaluation.employee.firstName} ${masterEvaluation.employee.lastName}`,
        period: masterEvaluation.period,
        overallScore: 0,
        categoriesReport: {},
        evaluationTypes: {
          Self: [],
          Peer: [],
          Supervisor: [],
          Subordinate: []
        }
      };

      evaluations.forEach(evaluation => {
        report.evaluationTypes[evaluation.evaluationType].push({
          evaluator: `${evaluation.evaluator.firstName} ${evaluation.evaluator.lastName}`,
          overallScore: evaluation.overallScore,
          comments: evaluation.comments
        });

        evaluation.categories.forEach(category => {
          if (!report.categoriesReport[category.name]) {
            report.categoriesReport[category.name] = { totalScore: 0, count: 0, comments: [] };
          }
          report.categoriesReport[category.name].totalScore += category.score;
          report.categoriesReport[category.name].count += 1;
          if (category.comments) {
            report.categoriesReport[category.name].comments.push(category.comments);
          }
        });

        report.overallScore += evaluation.overallScore;
      });

      report.overallScore /= evaluations.length;
      Object.keys(report.categoriesReport).forEach(category => {
        report.categoriesReport[category].averageScore = 
          report.categoriesReport[category].totalScore / report.categoriesReport[category].count;
      });

      res.status(200).json(report);
    } catch (error) {
      console.error('Error generating 360 report:', error);
      res.status(500).json({ message: 'Error generating 360 report' });
    }
  }

  static async getUserPendingEvaluations(req, res) {
    try {
      const userId = req.user.userId;
      const currentDate = new Date();

      const pendingEvaluations = await Evaluation.find({
        evaluator: userId,
        status: { $ne: 'Completed' }
      })
      .populate({
        path: 'masterEvaluation',
        select: 'deadline period',
        match: { deadline: { $gte: currentDate } }
      })
      .populate('employee', 'firstName lastName')
      .select('evaluationType status');

      const validPendingEvaluations = pendingEvaluations.filter(evaluation => evaluation.masterEvaluation);

      const formattedEvaluations = validPendingEvaluations.map(evaluation => ({
        evaluationId: evaluation._id,
        employeeName: `${evaluation.employee.firstName} ${evaluation.employee.lastName}`,
        evaluationType: evaluation.evaluationType,
        status: evaluation.status,
        period: evaluation.masterEvaluation.period,
        deadline: evaluation.masterEvaluation.deadline
      }));

      res.status(200).json(formattedEvaluations);
    } catch (error) {
      console.error('Error getting user pending evaluations:', error);
      res.status(500).json({ message: 'Error fetching pending evaluations' });
    }
  }

  static async getPendingMembersForMasterEvaluation(req, res) {
    try {
      const { masterEvaluationId } = req.params;

      const pendingEvaluations = await Evaluation.find({
        masterEvaluation: masterEvaluationId,
        status: { $ne: 'Completed' }
      })
      .populate('evaluator', 'firstName lastName email')
      .select('evaluationType status');

      const formattedPendingMembers = pendingEvaluations.map(evaluation => ({
        evaluationId: evaluation._id,
        evaluatorName: `${evaluation.evaluator.firstName} ${evaluation.evaluator.lastName}`,
        evaluatorEmail: evaluation.evaluator.email,
        evaluationType: evaluation.evaluationType,
        status: evaluation.status
      }));

      res.status(200).json(formattedPendingMembers);
    } catch (error) {
      console.error('Error getting pending members for master evaluation:', error);
      res.status(500).json({ message: 'Error fetching pending members' });
    }
  }

  static async updateFeedback(req, res) {
    try {
      const { feedbackId } = req.params;
      const { content } = req.body;
      
      const feedback = await Feedback.findByIdAndUpdate(
        feedbackId,
        { content },
        { new: true }
      );
      
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }
      
      res.status(200).json({ message: 'Feedback updated successfully', feedback });
    } catch (error) {
      console.error('Error updating feedback:', error);
      res.status(500).json({ message: 'Error updating feedback' });
    }
  }

  static async deleteFeedback(req, res) {
    try {
      const { feedbackId } = req.params;
      
      const feedback = await Feedback.findByIdAndDelete(feedbackId);
      
      if (!feedback) {
        return res.status(404).json({ message: 'Feedback not found' });
      }
      
      res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
      console.error('Error deleting feedback:', error);
      res.status(500).json({ message: 'Error deleting feedback' });
    }
  }
}

module.exports = EvaluationController;