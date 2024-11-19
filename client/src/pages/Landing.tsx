import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Bienvenido a REMOTE-360</h1>
          <p className="text-xl text-gray-600">Sistema de Evaluación 360 Grados para Equipos Remotos</p>
        </div>
        <Button onClick={handleLogin} variant="outline" className="text-lg px-6 py-2">
          Iniciar Sesión
        </Button>
      </header>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">¿Qué es REMOTE-360?</h2>
        <p className="text-lg text-gray-600 mb-4">
          REMOTE-360 es una plataforma innovadora diseñada para facilitar evaluaciones de desempeño
          360 grados en entornos de trabajo remotos. Nuestra solución permite a las empresas realizar
          evaluaciones completas y objetivas, mejorando el desarrollo profesional y el rendimiento del equipo.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Características Principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            "Evaluaciones 360 grados personalizables",
            "Interfaz intuitiva y fácil de usar",
            "Informes detallados y análisis de datos",
            "Seguimiento del progreso en tiempo real",
            "Compatibilidad con equipos remotos y distribuidos",
            "Seguridad y confidencialidad garantizadas"
          ].map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                  {feature}
                </CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">¿Cómo Funciona?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: "Configuración",
              description: "Personalice las evaluaciones según las necesidades de su empresa."
            },
            {
              title: "Evaluación",
              description: "Los empleados completan evaluaciones de sí mismos y de sus compañeros."
            },
            {
              title: "Análisis",
              description: "Obtenga informes detallados y perspectivas valiosas para el desarrollo."
            }
          ].map((step, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{step.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">¿Listo para Empezar?</h2>
        <div className="space-x-4">
          <Button size="lg" className="text-lg px-8 py-4">
            Solicitar una Demo
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-4" onClick={handleLogin}>
            Iniciar Sesión
          </Button>
        </div>
      </section>

      <footer className="text-center text-gray-600">
        <p>&copy; 2024 REMOTE-360. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default LandingPage;