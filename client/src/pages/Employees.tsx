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
import Template from "./Template";
import { roles } from "@/lib/constants";
import { useGetEmployeesQuery } from "@/lib/api";
import CreateUserEmployeeForm from "@/components/CreateUserAndEmployeForm";

const Employees: React.FC = () => {
	const [isNewEmployeeDialogOpen, setIsNewEmployeeDialogOpen] = useState(false);
	const role = useSelector((state: RootState) => state.auth.user?.role);
	const { data: employeesData, error } = useGetEmployeesQuery();

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
							<DialogContent className="sm:max-w-[750px] h-dvh lg:h-[85dvh] overflow-auto">
								<DialogHeader>
									<DialogTitle>Crear Nuevo Empleado</DialogTitle>
									<DialogDescription>
										Complete los detalles para crear un nuevo empleado y su
										cuenta de usuario.
									</DialogDescription>
								</DialogHeader>
								<CreateUserEmployeeForm />
							</DialogContent>
						</Dialog>
					)}
				</div>

				{/* Employees Table */}
				{!error && (
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
										<TableHead>Departmento</TableHead>
										{canManageEmployees && <TableHead>Acciones</TableHead>}
									</TableRow>
								</TableHeader>
								<TableBody>
									{employeesData &&
										employeesData.length > 0 &&
										employeesData.map((employee) => (
											<TableRow key={employee.id}>
												<TableCell>
													{employee.firstName} {employee.lastName}
												</TableCell>
												<TableCell>{employee.email}</TableCell>
												<TableCell>{employee.position}</TableCell>
												<TableCell>{employee.department.name}</TableCell>
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
				)}
			</div>
		</Template>
	);
};

export default Employees;
