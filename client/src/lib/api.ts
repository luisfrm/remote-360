import { RootState } from "@/store";
import { Employee, PendingEvaluation, Evaluation, CreateUserAndEmployeeResponse, CreateUserAndEmployeeRequest } from "./types"; // Adjust the import path as necessary
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "./constants";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL,
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		// Auth endpoints
		login: builder.mutation<
			{
				token: string;
				user: { email: string; role: string; username: string; id: string };
			},
			{ email: string; password: string }
		>({
			query: (credentials) => ({
				url: "auth/login",
				method: "POST",
				body: credentials,
			}),
		}),
		validateToken: builder.mutation<
			{ user: { email: string; role: string; username: string; id: string } },
			{
				token: string;
			}
		>({
			query: ({ token }) => ({
				url: "auth/validate-token",
				method: "POST",
				body: {
					token
				},
			}),
		}),

		// Employee endpoints
		getEmployees: builder.query<Employee[], void>({
			query: () => "/employees",
		}),
		createUserEmployee: builder.mutation<CreateUserAndEmployeeResponse, CreateUserAndEmployeeRequest>({
      query: (newUserEmployee) => ({
        url: '/auth/create-user-and-employee',
        method: 'POST',
        body: newUserEmployee,
      }),
    }),
		getEmployeeById: builder.query<Employee, string>({
      query: (id) => `employees/${id}`,
    }),

		// Evaluation endpoints
		getPendingEvaluations: builder.query<PendingEvaluation[], void>({
			query: () => "evaluations/pending",
		}),
		getEvaluation: builder.query<Evaluation, string>({
			query: (id) => `evaluations/${id}`,
		}),
		submitEvaluation: builder.mutation<
			Evaluation,
			{ id: string; evaluationData: Partial<Evaluation> }
		>({
			query: ({ id, ...body }) => ({
				url: `evaluations/${id}/submit`,
				method: "PUT",
				body,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useGetEmployeesQuery,
	useGetPendingEvaluationsQuery,
	useGetEvaluationQuery,
	useValidateTokenMutation,
	useSubmitEvaluationMutation,
	useGetEmployeeByIdQuery,
	useCreateUserEmployeeMutation
} = api;
