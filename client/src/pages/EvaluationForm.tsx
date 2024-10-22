import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useGetEvaluationQuery, useSubmitEvaluationMutation } from "../lib/api";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import Template from "./Template";

const EvaluationForm: React.FC = () => {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const { user } = useSelector((state: RootState) => state.auth);
	const { data: evaluation, isLoading, error } = useGetEvaluationQuery(id!);
	const [submitEvaluation, { isLoading: isSubmitting }] =
		useSubmitEvaluationMutation();

	const [formData, setFormData] = useState<Record<string, any>>({});

	useEffect(() => {
		if (evaluation) {
			// Initialize form data with default values
			const initialData: Record<string, any> = {};
			evaluation.questions.forEach((question) => {
				initialData[question.id] = question.type === "rating" ? 3 : "";
			});
			setFormData(initialData);
		}
	}, [evaluation]);

	const handleInputChange = (questionId: string, value: string | number) => {
		setFormData((prev) => ({ ...prev, [questionId]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			await submitEvaluation({ id: id!, evaluationData: formData }).unwrap();
			navigate("/evaluations", {
				state: { message: "Evaluación enviada con éxito" },
			});
		} catch (error) {
			console.error("Failed to submit evaluation:", error);
			// Handle error (e.g., show error message to user)
		}
	};

	if (isLoading) {
		return (
			<Template>
				<div className="flex justify-center items-center h-screen">
					<Loader2 className="h-8 w-8 animate-spin" />
				</div>
			</Template>
		);
	}

	if (error) {
		return (
			<Template>
				<Alert variant="destructive">
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						No se pudo cargar la evaluación. Por favor, intente de nuevo más
						tarde.
					</AlertDescription>
				</Alert>
			</Template>
		);
	}

	if (!evaluation) {
		return (
			<Template>
				<Alert variant="destructive">
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>
						No se encontró la evaluación solicitada.
					</AlertDescription>
				</Alert>
			</Template>
		);
	}

	return (
		<Template>
			<div className="space-y-6">
				<h1 className="text-3xl font-bold text-gray-900">
					Evaluación para {evaluation.employeeName}
				</h1>
				<Card>
					<CardHeader>
						<CardTitle>{evaluation.title}</CardTitle>
						<CardDescription>
							Tipo de evaluación: {evaluation.type}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							{evaluation.questions.map((question) => (
								<div key={question.id} className="space-y-2">
									<Label htmlFor={question.id}>{question.text}</Label>
									{question.type === "text" && (
										<Input
											id={question.id}
											value={formData[question.id] || ""}
											onChange={(e) =>
												handleInputChange(question.id, e.target.value)
											}
											required
										/>
									)}
									{question.type === "textarea" && (
										<Textarea
											id={question.id}
											value={formData[question.id] || ""}
											onChange={(e) =>
												handleInputChange(question.id, e.target.value)
											}
											required
										/>
									)}
									{question.type === "rating" && (
										<Slider
											id={question.id}
											min={1}
											max={5}
											step={1}
											value={[formData[question.id] || 3]}
											onValueChange={(value) =>
												handleInputChange(question.id, value[0])
											}
										/>
									)}
									{question.type === "multiple_choice" && (
										<RadioGroup
											onValueChange={(value) =>
												handleInputChange(question.id, value)
											}
											value={formData[question.id] || ""}
										>
											{question.options?.map((option) => (
												<div
													key={option.value}
													className="flex items-center space-x-2"
												>
													<RadioGroupItem
														value={option.value}
														id={`${question.id}-${option.value}`}
													/>
													<Label htmlFor={`${question.id}-${option.value}`}>
														{option.label}
													</Label>
												</div>
											))}
										</RadioGroup>
									)}
								</div>
							))}
							<Button type="submit" disabled={isSubmitting}>
								{isSubmitting ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin" />
								) : null}
								Enviar Evaluación
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</Template>
	);
};

export default EvaluationForm;
