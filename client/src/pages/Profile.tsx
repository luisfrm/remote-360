import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import Template from "./Template";
import H1_Heading from "@/components/H1_Heading";

const Profile: React.FC = () => {
	const { user } = useSelector((state: RootState) => state.auth);
	const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] =
		useState(false);

	const handleChangePassword = (event: React.FormEvent) => {
		event.preventDefault();
		// TODO: Implement password change logic
		setIsChangePasswordDialogOpen(false);
	};

	if (!user) {
		return <div>No se ha encontrado información del usuario.</div>;
	}

	return (
		<Template>
			<div className="space-y-6">
				<H1_Heading>Mi Perfil</H1_Heading>

				<Card>
					<CardHeader>
						<CardTitle>Información Personal</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center space-x-4">
							<Avatar className="h-20 w-20">
								<AvatarImage src="/placeholder.svg" alt={user.username} />
								<AvatarFallback>
									{user.username.charAt(0).toUpperCase()}
								</AvatarFallback>
							</Avatar>
							<div>
								<h2 className="text-2xl font-semibold">{user.username}</h2>
								<p className="text-gray-500">{user.role}</p>
							</div>
						</div>
						<div>
							<Label htmlFor="email">Correo Electrónico</Label>
							<Input id="email" value={user.email} readOnly />
						</div>
						<div>
							<Label htmlFor="id">ID de Usuario</Label>
							<Input id="id" value={user.id} readOnly />
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Seguridad</CardTitle>
					</CardHeader>
					<CardContent>
						<Dialog
							open={isChangePasswordDialogOpen}
							onOpenChange={setIsChangePasswordDialogOpen}
						>
							<DialogTrigger asChild>
								<Button>Cambiar Contraseña</Button>
							</DialogTrigger>
							<DialogContent>
								<DialogHeader>
									<DialogTitle>Cambiar Contraseña</DialogTitle>
									<DialogDescription>
										Ingrese su contraseña actual y la nueva contraseña.
									</DialogDescription>
								</DialogHeader>
								<form onSubmit={handleChangePassword} className="space-y-4">
									<div>
										<Label htmlFor="currentPassword">Contraseña Actual</Label>
										<Input id="currentPassword" type="password" />
									</div>
									<div>
										<Label htmlFor="newPassword">Nueva Contraseña</Label>
										<Input id="newPassword" type="password" />
									</div>
									<div>
										<Label htmlFor="confirmPassword">
											Confirmar Nueva Contraseña
										</Label>
										<Input id="confirmPassword" type="password" />
									</div>
									<Button type="submit">Actualizar Contraseña</Button>
								</form>
							</DialogContent>
						</Dialog>
					</CardContent>
				</Card>

				{/* Aquí puedes agregar más secciones según sea necesario, como historial de evaluaciones, etc. */}
			</div>
		</Template>
	);
};

export default Profile;
