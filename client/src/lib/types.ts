export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
}

export interface AuthState {
	token: string | null;
	isAuthenticated: boolean;
	user: { email: string; role: string; username: string; id: string } | null;
}

export interface Evaluation {
  _id: string;
  employeeId: string;
  employeeName: string;
  evaluatorId: string;
  evaluatorName: string;
  type: string;
  deadline: string;
  questions: {
    question: string;
    answer: string;
  }[];
}

export interface PendingEvaluation {
  evaluationId: string;
  employeeName: string;
  evaluationType: string;
  deadline: string;
}