import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import Template from "./Template";

const Settings: React.FC = () => {
	const { user } = useSelector((state: RootState) => state.auth);
	const [isLoading, setIsLoading] = useState(false);
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const [generalSettings, setGeneralSettings] = useState({
		language: "es",
		theme: "light",
		emailNotifications: true,
	});

	const [evaluationSettings, setEvaluationSettings] = useState({
		defaultEvaluationPeriod: "6",
		reminderFrequency: "weekly",
	});

	const handleGeneralSettingsChange = (
		key: string,
		value: string | boolean
	) => {
		setGeneralSettings((prev) => ({ ...prev, [key]: value }));
	};

	const handleEvaluationSettingsChange = (key: string, value: string) => {
		setEvaluationSettings((prev) => ({ ...prev, [key]: value }));
	};

	const handleSaveSettings = async () => {
		setIsLoading(true);
		// TODO: Implement API call to save settings
		// For now, we'll simulate an API call
		await new Promise((resolve) => setTimeout(resolve, 1000));
		setIsLoading(false);
		setSuccessMessage("Configuración guardada exitosamente");
		setTimeout(() => setSuccessMessage(null), 3000);
	};

	return (
		<Template>
			<div className="space-y-6">
				<h1 className="text-3xl font-bold text-gray-900">Configuración</h1>

				{successMessage && (
					<Alert>
						<AlertTitle>Éxito</AlertTitle>
						<AlertDescription>{successMessage}</AlertDescription>
					</Alert>
				)}

				<Tabs defaultValue="general">
					<TabsList>
						<TabsTrigger value="general">General</TabsTrigger>
						<TabsTrigger value="evaluations">Evaluaciones</TabsTrigger>
						{user?.role === "Admin" && (
							<TabsTrigger value="system">Sistema</TabsTrigger>
						)}
					</TabsList>

					<TabsContent value="general">
						<Card>
							<CardHeader>
								<CardTitle>Configuración General</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="language">Idioma</Label>
									<Select
										value={generalSettings.language}
										onValueChange={(value) =>
											handleGeneralSettingsChange("language", value)
										}
									>
										<SelectTrigger id="language">
											<SelectValue placeholder="Seleccione un idioma" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="es">Español</SelectItem>
											<SelectItem value="en">English</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="theme">Tema</Label>
									<Select
										value={generalSettings.theme}
										onValueChange={(value) =>
											handleGeneralSettingsChange("theme", value)
										}
									>
										<SelectTrigger id="theme">
											<SelectValue placeholder="Seleccione un tema" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="light">Claro</SelectItem>
											<SelectItem value="dark">Oscuro</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-center space-x-2">
									<Switch
										id="emailNotifications"
										checked={generalSettings.emailNotifications}
										onCheckedChange={(checked) =>
											handleGeneralSettingsChange("emailNotifications", checked)
										}
									/>
									<Label htmlFor="emailNotifications">
										Recibir notificaciones por correo
									</Label>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					<TabsContent value="evaluations">
						<Card>
							<CardHeader>
								<CardTitle>Configuración de Evaluaciones</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="space-y-2">
									<Label htmlFor="defaultEvaluationPeriod">
										Período de Evaluación Predeterminado (meses)
									</Label>
									<Select
										value={evaluationSettings.defaultEvaluationPeriod}
										onValueChange={(value) =>
											handleEvaluationSettingsChange(
												"defaultEvaluationPeriod",
												value
											)
										}
									>
										<SelectTrigger id="defaultEvaluationPeriod">
											<SelectValue placeholder="Seleccione un período" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="3">3 meses</SelectItem>
											<SelectItem value="6">6 meses</SelectItem>
											<SelectItem value="12">12 meses</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="reminderFrequency">
										Frecuencia de Recordatorios
									</Label>
									<Select
										value={evaluationSettings.reminderFrequency}
										onValueChange={(value) =>
											handleEvaluationSettingsChange("reminderFrequency", value)
										}
									>
										<SelectTrigger id="reminderFrequency">
											<SelectValue placeholder="Seleccione una frecuencia" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="daily">Diario</SelectItem>
											<SelectItem value="weekly">Semanal</SelectItem>
											<SelectItem value="never">Nunca</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>
					</TabsContent>

					{user?.role === "Admin" && (
						<TabsContent value="system">
							<Card>
								<CardHeader>
									<CardTitle>Configuración del Sistema</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="space-y-2">
										<Label htmlFor="maxUsers">Número Máximo de Usuarios</Label>
										<Input id="maxUsers" type="number" placeholder="Ej: 1000" />
									</div>
									<div className="space-y-2">
										<Label htmlFor="dataRetentionPeriod">
											Período de Retención de Datos (meses)
										</Label>
										<Input
											id="dataRetentionPeriod"
											type="number"
											placeholder="Ej: 24"
										/>
									</div>
									<div className="flex items-center space-x-2">
										<Switch id="maintenanceMode" />
										<Label htmlFor="maintenanceMode">
											Modo de Mantenimiento
										</Label>
									</div>
								</CardContent>
							</Card>
						</TabsContent>
					)}
				</Tabs>

				<Button onClick={handleSaveSettings} disabled={isLoading}>
					{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
					Guardar Configuración
				</Button>
			</div>
		</Template>
	);
};

export default Settings;
