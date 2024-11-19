import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Loader2 } from 'lucide-react';
import Template from "./Template";
import { toast } from "sonner";

interface Question {
  id: string;
  text: string;
  type: 'text' | 'textarea' | 'rating' | 'multiple_choice';
  options?: { value: string; label: string }[];
}

interface Evaluation {
  id: string;
  employeeName: string;
  title: string;
  type: string;
  questions: Question[];
}

// Datos ficticios de evaluación
const mockEvaluation: Evaluation = {
  id: "1",
  employeeName: "Juan Pérez",
  title: "Evaluación de Desempeño Anual",
  type: "360 grados",
  questions: [
    {
      id: "q1",
      text: "¿Cómo calificaría el desempeño general del empleado?",
      type: "rating",
    },
    {
      id: "q2",
      text: "¿Cuáles son las principales fortalezas del empleado?",
      type: "textarea",
    },
    {
      id: "q3",
      text: "¿En qué áreas cree que el empleado podría mejorar?",
      type: "textarea",
    },
    {
      id: "q4",
      text: "¿Cómo calificaría la capacidad de trabajo en equipo del empleado?",
      type: "multiple_choice",
      options: [
        { value: "excelente", label: "Excelente" },
        { value: "bueno", label: "Bueno" },
        { value: "promedio", label: "Promedio" },
        { value: "necesita_mejorar", label: "Necesita mejorar" },
      ],
    },
  ],
};

const EvaluationForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<Record<string, string | number>>({});

  useEffect(() => {
    // Inicializar formData con valores por defecto
    const initialData: Record<string, string | number> = {};
    mockEvaluation.questions.forEach((question) => {
      initialData[question.id] = question.type === "rating" ? 3 : "";
    });
    setFormData(initialData);
  }, []);

  const handleInputChange = (questionId: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setIsSubmitting(true);
    try {
      // Simular envío de datos
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Datos enviados:", formData);
      navigate("/evaluations", {
        state: { message: "Evaluación enviada con éxito" },
      });
			toast.success('Su evaluacion ha sido enviada')
    } catch (error) {
      console.error("Failed to submit evaluation:", error);
      // Manejar el error (por ejemplo, mostrar un mensaje de error al usuario)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Template>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Evaluación para {mockEvaluation.employeeName}
        </h1>
        <Card>
          <CardHeader>
            <CardTitle>{mockEvaluation.title}</CardTitle>
            <CardDescription>
              Tipo de evaluación: {mockEvaluation.type}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {mockEvaluation.questions.map((question) => (
                <div key={question.id} className="space-y-2">
                  <Label htmlFor={question.id}>{question.text}</Label>
                  {question.type === "text" && (
                    <Input
                      id={question.id}
                      value={formData[question.id]?.toString() || ""}
                      onChange={(e) =>
                        handleInputChange(question.id, e.target.value)
                      }
                      required
                    />
                  )}
                  {question.type === "textarea" && (
                    <Textarea
                      id={question.id}
                      value={formData[question.id]?.toString() || ""}
                      onChange={(e) =>
                        handleInputChange(question.id, e.target.value)
                      }
                      required
                    />
                  )}
                  {question.type === "rating" && (
                    <Slider
                      id={question.id}
                      min={1}
                      max={5}
                      step={1}
                      value={[Number(formData[question.id] || 3)]}
                      onValueChange={(value) =>
                        handleInputChange(question.id, value[0])
                      }
                    />
                  )}
                  {question.type === "multiple_choice" && (
                    <RadioGroup
                      onValueChange={(value) =>
                        handleInputChange(question.id, value)
                      }
                      value={formData[question.id]?.toString() || ""}
                    >
                      {question.options?.map((option) => (
                        <div
                          key={option.value}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            value={option.value}
                            id={`${question.id}-${option.value}`}
                          />
                          <Label htmlFor={`${question.id}-${option.value}`}>
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                </div>
              ))}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Enviar Evaluación
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Template>
  );
};

export default EvaluationForm;