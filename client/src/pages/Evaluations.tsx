import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import Template from "./Template";

const Evaluations: React.FC = () => {
	const navigate = useNavigate();
	const [isNewEvaluationDialogOpen, setIsNewEvaluationDialogOpen] =
		useState(false);

	// TODO: Replace with actual data from API
	const evaluationsData = {
		pendingEvaluations: [
			{
				id: 1,
				employeeName: "Ana Martínez",
				evaluationType: "360",
				deadline: "2024-07-15",
			},
			{
				id: 2,
				employeeName: "Pedro Sánchez",
				evaluationType: "Self",
				deadline: "2024-07-18",
			},
			{
				id: 3,
				employeeName: "Laura Fernández",
				evaluationType: "360",
				deadline: "2024-07-20",
			},
			{
				id: 4,
				employeeName: "Carlos Rodríguez",
				evaluationType: "Manager",
				deadline: "2024-07-22",
			},
			{
				id: 5,
				employeeName: "Elena Gómez",
				evaluationType: "360",
				deadline: "2024-07-25",
			},
		],
		completedEvaluations: 15,
		totalEvaluations: 20,
	};

	const handleStartEvaluation = (evaluationId: number) => {
		// TODO: Implement logic to start the evaluation
		navigate(`/evaluation/${evaluationId}`);
	};

	const handleCreateNewEvaluation = (event: React.FormEvent) => {
		event.preventDefault();
		// TODO: Implement logic to create a new evaluation
		setIsNewEvaluationDialogOpen(false);
	};

	return (
		<Template>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-gray-900">Evaluaciones</h1>
					<Dialog
						open={isNewEvaluationDialogOpen}
						onOpenChange={setIsNewEvaluationDialogOpen}
					>
						<DialogTrigger asChild>
							<Button>Iniciar Nueva Evaluación</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Crear Nueva Evaluación</DialogTitle>
								<DialogDescription>
									Complete los detalles para iniciar una nueva evaluación.
								</DialogDescription>
							</DialogHeader>
							<form onSubmit={handleCreateNewEvaluation} className="space-y-4">
								<div>
									<Label htmlFor="employeeName">Nombre del Empleado</Label>
									<Input id="employeeName" placeholder="Nombre del empleado" />
								</div>
								<div>
									<Label htmlFor="evaluationType">Tipo de Evaluación</Label>
									<Select>
										<SelectTrigger>
											<SelectValue placeholder="Seleccione el tipo" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="360">360</SelectItem>
											<SelectItem value="self">Auto-evaluación</SelectItem>
											<SelectItem value="manager">
												Evaluación del Gerente
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div>
									<Label htmlFor="deadline">Fecha Límite</Label>
									<Input id="deadline" type="date" />
								</div>
								<Button type="submit">Crear Evaluación</Button>
							</form>
						</DialogContent>
					</Dialog>
				</div>

				{/* Summary Cards */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Evaluaciones Pendientes
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{evaluationsData.pendingEvaluations.length}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Evaluaciones Completadas
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{evaluationsData.completedEvaluations}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total de Evaluaciones
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{evaluationsData.totalEvaluations}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Pending Evaluations Table */}
				<Card>
					<CardHeader>
						<CardTitle>Evaluaciones Pendientes</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Empleado</TableHead>
									<TableHead>Tipo de Evaluación</TableHead>
									<TableHead>Fecha Límite</TableHead>
									<TableHead>Acción</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{evaluationsData.pendingEvaluations.map((evaluation) => (
									<TableRow key={evaluation.id}>
										<TableCell>{evaluation.employeeName}</TableCell>
										<TableCell>{evaluation.evaluationType}</TableCell>
										<TableCell>{evaluation.deadline}</TableCell>
										<TableCell>
											<Button
												onClick={() => handleStartEvaluation(evaluation.id)}
											>
												Iniciar
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</Template>
	);
};

export default Evaluations;
