import { RootState } from "@/store";
import { Employee, PendingEvaluation, Evaluation } from "./types"; // Adjust the import path as necessary
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:4506/api",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		login: builder.mutation<
			{ token: string, user: { email: string; role: string; username: string; id: string } },
			{ email: string; password: string }
		>({
			query: (credentials) => ({
				url: "auth/login",
				method: "POST",
				body: credentials,
			}),
		}),
		getEmployees: builder.query<Employee[], void>({
			query: () => "employees",
		}),
		getPendingEvaluations: builder.query<PendingEvaluation[], void>({
			query: () => "evaluations/pending",
		}),
		getEvaluation: builder.query<Evaluation, string>({
			query: (id) => `evaluations/${id}`,
		}),
		submitEvaluation: builder.mutation<Evaluation, { id: string; evaluationData: Partial<Evaluation> }>(
			{
				query: ({ id, ...body }) => ({
					url: `evaluations/${id}/submit`,
					method: "PUT",
					body,
				}),
			}
		),
	}),
});

export const { 
  useLoginMutation, 
  useGetEmployeesQuery, 
  useGetPendingEvaluationsQuery,
  useGetEvaluationQuery,
  useSubmitEvaluationMutation
} = api;
