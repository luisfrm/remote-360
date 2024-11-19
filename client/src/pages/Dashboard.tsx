import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
} from "recharts";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Template from "./Template";
import H1_Heading from "@/components/H1_Heading";

const Dashboard: React.FC = () => {
	// TODO: Replace with actual data from API
	const dashboardData = {
		pendingEvaluations: 5,
		completedEvaluations: 15,
		totalEmployees: 50,
		departmentScores: [
			{ department: "Desarrollo", score: 4.2 },
			{ department: "Diseño", score: 4.5 },
			{ department: "Marketing", score: 3.8 },
			{ department: "Ventas", score: 4.0 },
		],
		recentActivity: [
			"Juan Pérez completó su evaluación",
			"Nueva evaluación iniciada para el equipo de Desarrollo",
			"María González envió feedback para su evaluación",
			"Actualización de perfil: Carlos Rodríguez",
		],
		upcomingEvaluations: [
			{ id: 1, employeeName: "Ana Martínez", dueDate: "2024-07-15" },
			{ id: 2, employeeName: "Pedro Sánchez", dueDate: "2024-07-18" },
			{ id: 3, employeeName: "Laura Fernández", dueDate: "2024-07-20" },
		],
		topPerformers: [
			{ id: 1, name: "Elena Gómez", avatar: "/placeholder.svg", score: 4.8 },
			{ id: 2, name: "Javier López", avatar: "/placeholder.svg", score: 4.7 },
			{ id: 3, name: "Sofía Ruiz", avatar: "/placeholder.svg", score: 4.6 },
		],
	};

	return (
		<Template>
			<div className="space-y-6">
				<H1_Heading>Dashboard</H1_Heading>

				{/* Quick Summary */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Evaluaciones Pendientes
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{dashboardData.pendingEvaluations}
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
								{dashboardData.completedEvaluations}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total de Empleados
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{dashboardData.totalEmployees}
							</div>
						</CardContent>
					</Card>
				</div>

				{/* Performance Chart */}
				<Card>
					<CardHeader>
						<CardTitle>Puntuaciones Promedio por Departmento</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-[300px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart data={dashboardData.departmentScores}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="department" />
									<YAxis />
									<Tooltip />
									<Bar dataKey="score" fill="#8884d8" />
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>

				{/* Recent Activity and Upcoming Evaluations */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Actividad Reciente</CardTitle>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2">
								{dashboardData.recentActivity.map((activity, index) => (
									<li key={index} className="text-sm text-gray-600">
										{activity}
									</li>
								))}
							</ul>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Próximas Evaluaciones</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Empleado</TableHead>
										<TableHead>Fecha Límite</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{dashboardData.upcomingEvaluations.map((evaluation) => (
										<TableRow key={evaluation.id}>
											<TableCell>{evaluation.employeeName}</TableCell>
											<TableCell>{evaluation.dueDate}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>

				{/* Top Performers */}
				<Card>
					<CardHeader>
						<CardTitle>Top Performers</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex justify-around">
							{dashboardData.topPerformers.map((performer) => (
								<div key={performer.id} className="text-center">
									<Avatar className="h-20 w-20 mx-auto">
										<AvatarImage src={performer.avatar} alt={performer.name} />
										<AvatarFallback>{performer.name.charAt(0)}</AvatarFallback>
									</Avatar>
									<p className="mt-2 font-semibold">{performer.name}</p>
									<p className="text-sm text-gray-600">
										Score: {performer.score}
									</p>
								</div>
							))}
						</div>
					</CardContent>
				</Card>

				{/* Quick Actions */}
				<Card>
					<CardHeader>
						<CardTitle>Acciones Rápidas</CardTitle>
					</CardHeader>
					<CardContent className="md:flex space-y-4 md:space-x-4 md:space-y-0">
						<Button>Iniciar Nueva Evaluación</Button>
						<Button variant="outline">Ver Evaluaciones Pendientes</Button>
					</CardContent>
				</Card>
			</div>
		</Template>
	);
};

export default Dashboard;
