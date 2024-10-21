const Evaluation = require('../models/evaluation.model');
const MasterEvaluation = require('../models/masterEvaluation.model');

class ReportController {
  static async generateEmployeeReport(req, res) {
    try {
      const { employeeId } = req.params;
      const masterEvaluations = await MasterEvaluation.find({ employee: employeeId })
        .sort({ createdAt: -1 })
        .limit(5);

      const report = [];

      for (const masterEvaluation of masterEvaluations) {
        const evaluations = await Evaluation.find({ masterEvaluation: masterEvaluation._id })
          .populate('evaluator', 'firstName lastName');

        const evaluationReport = {
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
          evaluationReport.evaluationTypes[evaluation.evaluationType].push({
            evaluator: `${evaluation.evaluator.firstName} ${evaluation.evaluator.lastName}`,
            overallScore: evaluation.overallScore,
            comments: evaluation.comments
          });

          evaluation.categories.forEach(category => {
            if (!evaluationReport.categoriesReport[category.name]) {
              evaluationReport.categoriesReport[category.name] = { totalScore: 0, count: 0, comments: [] };
            }
            evaluationReport.categoriesReport[category.name].totalScore += category.score;
            evaluationReport.categoriesReport[category.name].count += 1;
            if (category.comments) {
              
              evaluationReport.categoriesReport[category.name].comments.push(category.comments);
            }
          });

          evaluationReport.overallScore += evaluation.overallScore;
        });

        evaluationReport.overallScore /= evaluations.length;
        Object.keys(evaluationReport.categoriesReport).forEach(category => {
          evaluationReport.categoriesReport[category].averageScore = 
            evaluationReport.categoriesReport[category].totalScore / evaluationReport.categoriesReport[category].count;
        });

        report.push(evaluationReport);
      }

      res.json(report);
    } catch (error) {
      console.error('Error generating employee report:', error);
      res.status(500).json({ message: 'Error generating employee report' });
    }
  }
}

module.exports = ReportController;