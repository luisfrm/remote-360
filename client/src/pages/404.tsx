import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

const NotFound: React.FC = () => {
	const navigate = useNavigate();

	return (
		<>
			<div className="flex items-center justify-center min-h-screen bg-slate-300">
				<Card className="w-full max-w-md">
					<CardHeader className="text-center">
						<CardTitle className="text-4xl font-bold text-gray-900">
							404
						</CardTitle>
					</CardHeader>
					<CardContent className="text-center">
						<AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
						<h2 className="text-2xl font-semibold text-gray-800 mb-2">
							Página no encontrada
						</h2>
						<p className="text-gray-600">
							Lo sentimos, la página que estás buscando no existe o ha sido
							movida.
						</p>
					</CardContent>
					<CardFooter className="flex justify-center">
						<Button onClick={() => navigate("/")} className="w-full">
							Volver a la página principal
						</Button>
					</CardFooter>
				</Card>
			</div>
		</>
	);
};

export default NotFound;
