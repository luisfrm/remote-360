import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Template from './Template';
import H1_Heading from '@/components/H1_Heading';

const Reports: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  // TODO: Replace with actual data from API
  const employeesData = [
    { id: '1', name: 'Ana Martínez' },
    { id: '2', name: 'Pedro Sánchez' },
    { id: '3', name: 'Laura Fernández' },
    { id: '4', name: 'Carlos Rodríguez' },
    { id: '5', name: 'Elena Gómez' },
  ];

  const reportData = {
    evaluations: [
      { id: '1', type: '360', date: '2024-05-15', score: 4.2 },
      { id: '2', type: 'Self', date: '2024-06-01', score: 4.5 },
      { id: '3', type: 'Manager', date: '2024-06-15', score: 4.0 },
    ],
    averageScores: [
      { category: 'Comunicación', score: 4.2 },
      { category: 'Trabajo en equipo', score: 4.5 },
      { category: 'Habilidades técnicas', score: 4.0 },
      { category: 'Liderazgo', score: 3.8 },
      { category: 'Productividad', score: 4.3 },
    ],
  };

  const handleGenerateReport = () => {
    // TODO: Implement logic to generate and display the report
    setIsReportDialogOpen(true);
  };

  const canViewAllReports = user?.role === 'Admin' || user?.role === 'Manager';

  return (
		<Template>
			<div className="space-y-6">
        <H1_Heading>Reportes de Evaluación</H1_Heading>

				{canViewAllReports ? (
					<Card>
						<CardHeader>
							<CardTitle>Seleccionar Empleado</CardTitle>
						</CardHeader>
						<CardContent>
							<Select onValueChange={setSelectedEmployee}>
								<SelectTrigger className="w-[200px]">
									<SelectValue placeholder="Seleccione un empleado" />
								</SelectTrigger>
								<SelectContent>
									{employeesData.map(employee => (
										<SelectItem key={employee.id} value={employee.id}>
											{employee.name}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
							<Button className="mt-4" onClick={handleGenerateReport} disabled={!selectedEmployee}>
								Generar Reporte
							</Button>
						</CardContent>
					</Card>
				) : (
					<Button onClick={handleGenerateReport}>Ver Mi Reporte</Button>
				)}

				<Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
					<DialogContent className="max-w-4xl overflow-y-auto max-h-dvh lg:max-h-[90dvh]">
						<DialogHeader>
							<DialogTitle>Reporte de Evaluación</DialogTitle>
						</DialogHeader>
						<div className="space-y-6">
							<Card>
								<CardHeader>
									<CardTitle>Historial de Evaluaciones</CardTitle>
								</CardHeader>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Tipo</TableHead>
												<TableHead>Fecha</TableHead>
												<TableHead>Puntuación</TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{reportData.evaluations.map(evaluation => (
												<TableRow key={evaluation.id}>
													<TableCell>{evaluation.type}</TableCell>
													<TableCell>{evaluation.date}</TableCell>
													<TableCell>{evaluation.score}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</CardContent>
							</Card>

							<Card>
								<CardHeader>
									<CardTitle>Puntuaciones Promedio por Categoría</CardTitle>
								</CardHeader>
								<CardContent>
									<div className="h-[300px]">
										<ResponsiveContainer width="100%" height="100%">
											<BarChart data={reportData.averageScores}>
												<CartesianGrid strokeDasharray="3 3" />
												<XAxis dataKey="category" />
												<YAxis />
												<Tooltip />
												<Bar dataKey="score" fill="#8884d8" />
											</BarChart>
										</ResponsiveContainer>
									</div>
								</CardContent>
							</Card>

							{/* Aquí puedes agregar más secciones del reporte según sea necesario */}
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</Template>
	);
};

export default Reports;