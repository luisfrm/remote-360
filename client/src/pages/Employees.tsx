import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
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
import { roles } from "@/lib/constants";

const Employees: React.FC = () => {
	const [isNewEmployeeDialogOpen, setIsNewEmployeeDialogOpen] = useState(false);
	const role = useSelector((state: RootState) => state.auth.user?.role);

	// TODO: Replace with actual data from API
	const employeesData = [
		{
			id: 1,
			name: "Ana Martínez",
			email: "ana.martinez@example.com",
			position: "Desarrollador",
			department: "IT",
		},
		{
			id: 2,
			name: "Pedro Sánchez",
			email: "pedro.sanchez@example.com",
			position: "Diseñador",
			department: "Diseño",
		},
		{
			id: 3,
			name: "Laura Fernández",
			email: "laura.fernandez@example.com",
			position: "Gerente de Proyecto",
			department: "Administración",
		},
		{
			id: 4,
			name: "Carlos Rodríguez",
			email: "carlos.rodriguez@example.com",
			position: "Analista de Datos",
			department: "IT",
		},
		{
			id: 5,
			name: "Elena Gómez",
			email: "elena.gomez@example.com",
			position: "Recursos Humanos",
			department: "RRHH",
		},
	];

	const handleCreateNewEmployee = (event: React.FormEvent) => {
		event.preventDefault();
		// TODO: Implement logic to create a new employee and user
		// This should call the /api/auth/create-user-and-employee endpoint
		setIsNewEmployeeDialogOpen(false);
	};

	const canManageEmployees = role === roles.admin || role === roles.manager;

	return (
		<Template>
			<div className="space-y-6">
				<div className="flex justify-between items-center">
					<h1 className="text-3xl font-bold text-gray-900">Empleados</h1>
					{canManageEmployees && (
						<Dialog
							open={isNewEmployeeDialogOpen}
							onOpenChange={setIsNewEmployeeDialogOpen}
						>
							<DialogTrigger asChild>
								<Button>Agregar Nuevo Empleado</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Crear Nuevo Empleado</DialogTitle>
									<DialogDescription>
										Complete los detalles para crear un nuevo empleado y su
										cuenta de usuario.
									</DialogDescription>
								</DialogHeader>
								<form onSubmit={handleCreateNewEmployee} className="space-y-4">
									<div>
										<Label htmlFor="name">Nombre Completo</Label>
										<Input id="name" placeholder="Nombre del empleado" />
									</div>
									<div>
										<Label htmlFor="email">Correo Electrónico</Label>
										<Input
											id="email"
											type="email"
											placeholder="correo@ejemplo.com"
										/>
									</div>
									<div>
										<Label htmlFor="position">Posición</Label>
										<Input id="position" placeholder="Posición del empleado" />
									</div>
									<div>
										<Label htmlFor="department">Departamento</Label>
										<Input id="department" placeholder="Departamento" />
									</div>
									<div>
										<Label htmlFor="role">Rol</Label>
										<Select>
											<SelectTrigger>
												<SelectValue placeholder="Seleccione el rol" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="employee">Empleado</SelectItem>
												<SelectItem value="manager">Gerente</SelectItem>
												{
                          role === roles.admin && (
                            <SelectItem value="admin">Administrador</SelectItem>
                          )
                        }
											</SelectContent>
										</Select>
									</div>
									<Button type="submit">Crear Empleado</Button>
								</form>
							</DialogContent>
						</Dialog>
					)}
				</div>

				{/* Employees Table */}
				<Card>
					<CardHeader>
						<CardTitle>Lista de Empleados</CardTitle>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Nombre</TableHead>
									<TableHead>Correo Electrónico</TableHead>
									<TableHead>Posición</TableHead>
									<TableHead>Departamento</TableHead>
									{canManageEmployees && <TableHead>Acciones</TableHead>}
								</TableRow>
							</TableHeader>
							<TableBody>
								{employeesData.map((employee) => (
									<TableRow key={employee.id}>
										<TableCell>{employee.name}</TableCell>
										<TableCell>{employee.email}</TableCell>
										<TableCell>{employee.position}</TableCell>
										<TableCell>{employee.department}</TableCell>
										{canManageEmployees && (
											<TableCell>
												<Button variant="outline" size="sm">
													Editar
												</Button>
											</TableCell>
										)}
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

export default Employees;
