import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setCredentials } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { toast } from 'sonner'
import { CircleAlert, Eye, EyeOff } from "lucide-react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import DotSpinner from "./DotSpinner";
import { useState } from "react";

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
	const [login, { isLoading }] = useLoginMutation();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [passwordType, setPasswordType] = useState<string>("password")

	const onSubmit = async (data: LoginFormData) => {
		try {
			const res = await login(data).unwrap();
			// Save the credentials to the Redux store
			dispatch(setCredentials({ token: res.token, user: res.user }));
			
			navigate("/dashboard");
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (err: any) {
			// Error is handled by the isError state
			console.error(err);
			if (err && err.data && err.data.message) {
				toast(<LoginError message={err?.data.message} />)
			} else {
				toast(<LoginError message="There was an issue getting login." />)
			}
		}
	};


	const chagePasswordType = () => {
			if (passwordType==="password") setPasswordType("text")
			else setPasswordType("password")
	};

	return (
		<Card className="w-full max-w-md mx-4">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl font-bold text-center">REMOTE-360</CardTitle>
				<CardDescription className="text-center">Ingresa a tu cuenta para continuar</CardDescription>
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
						{errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
					</div>
					<div className="space-y-2 relative">
						<Label htmlFor="password">Contraseña</Label>
						<Input
							id="password"
							type={passwordType}
							placeholder="Escribe tu contraseña..."
							{...register("password", {
								required: "La contraseña es requerida",
							})}
							className="w-full"
						/>
						{ passwordType==="password" ? (<Eye className="absolute top-8 right-5 cursor-pointer" onClick={chagePasswordType} />) : <EyeOff className="absolute top-8 right-5 cursor-pointer" onClick={chagePasswordType} /> }
						{errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
					</div>
					<Button type="submit" className="w-full" disabled={isLoading}>
						{isLoading ? <DotSpinner /> : "Iniciar Sesión"}
					</Button>
				</form>
			</CardContent>
			<CardFooter className="flex justify-center">
				<p className="text-sm text-gray-600">
					¿No tienes una cuenta? <span className="font-bold">Contacta con el administrador</span>
				</p>
			</CardFooter>
		</Card>
	);
};

interface LoginErrorProps {
	message: string;
}

const LoginError: React.FC<LoginErrorProps> = ({ message }) => {
	return (
		<>
			<CircleAlert className="text-red-600" /><p className="inline">{message}</p>
		</>
	)
}

export default LoginForm;
