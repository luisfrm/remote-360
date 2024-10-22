import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setCredentials } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import DotSpinner from "./DotSpinner";

interface LoginFormData {
	email: string;
	password: string;
}

const LoginForm: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>();
	const [login, { isLoading, error }] = useLoginMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const onSubmit = async (data: LoginFormData) => {
		try {
			const res = await login(data).unwrap();
			// Save the credentials to the Redux store
			dispatch(setCredentials({ token: res.token, user: res.user }));
			
			navigate("/dashboard");
		} catch (err) {
			// Error is handled by the isError state
			console.error(err);
		}
	};

	return (
		<Card className="w-full max-w-md mx-4">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl font-bold text-center">
					REMOTE-360
				</CardTitle>
				<CardDescription className="text-center">
					Ingresa a tu cuenta para continuar
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="email">Correo Electrónico</Label>
						<Input
							id="email"
							type="email"
							placeholder="tu@ejemplo.com"
							{...register("email", {
								required: "El correo electrónico es requerido",
							})}
							className="w-full"
						/>
						{errors.email && (
							<p className="text-sm text-red-500">{errors.email.message}</p>
						)}
					</div>
					<div className="space-y-2">
						<Label htmlFor="password">Contraseña</Label>
						<Input
							id="password"
							type="password"
							{...register("password", {
								required: "La contraseña es requerida",
							})}
							className="w-full"
						/>
						{errors.password && (
							<p className="text-sm text-red-500">{errors.password.message}</p>
						)}
					</div>
					{error && (
						<Alert variant="destructive">
							<AlertCircle className="h-4 w-4" />
							<AlertTitle>Error</AlertTitle>
							<AlertDescription>
								{error instanceof Error
									? error.message
									: "Ocurrió un error al iniciar sesión"}
							</AlertDescription>
						</Alert>
					)}
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? <DotSpinner /> : "Iniciar Sesión"}
					</Button>
				</form>
			</CardContent>
			<CardFooter className="flex justify-center">
				<p className="text-sm text-gray-600">
					¿No tienes una cuenta?{" "}
          <span className="font-bold">Contacta con el administrador</span>
				</p>
			</CardFooter>
		</Card>
	);
};

export default LoginForm;
