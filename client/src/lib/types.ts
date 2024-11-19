export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  department: {
    name: string;
  };
  email: string;
  position: string;
  userId: string;
}

export interface AuthState {
	token: string | null;
	isAuthenticated: boolean;
	user: { email: string; role: string; username: string; id: string } | null;
  isLoading: boolean;
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

export interface CreateUserAndEmployeeRequest {
  username: string;
  email: string;
  password: string;
  role: 'Admin' | 'Manager' | 'Employee';
  firstName: string;
  lastName: string;
  department: string;
  position: string;
  hireDate: string;
}

export interface CreateUserAndEmployeeResponse {
  message: string;
  userId: string;
  employeeId: string;
  role: string;
  isManager: boolean;
}
