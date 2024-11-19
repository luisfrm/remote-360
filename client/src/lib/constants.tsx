import { Home, Users, ClipboardList, BarChart2, User, Settings, Network } from 'lucide-react';

export const API_URL = 'http://localhost:4506/api';

export const navItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <Home className="mr-2" /> },
  { name: 'Evaluaciones', path: '/evaluations', icon: <ClipboardList className="mr-2" /> },
  { name: 'Departmentos', path: '/departments', icon: <Network className="mr-2" /> },
  { name: 'Empleados', path: '/employees', icon: <Users className="mr-2" /> },
  { name: 'Reportes', path: '/reports', icon: <BarChart2 className="mr-2" /> },
  { name: 'Perfil', path: '/profile', icon: <User className="mr-2" /> },
  { name: 'Configuración', path: '/settings', icon: <Settings className="mr-2" /> },
];

export const roles = {
  admin: 'Admin',
  manager: 'Manager',
  employee: 'Employee',
};

export const Department = {
  IT: 'IT',
  HR: 'HR',
  FINANCE: 'Finance',
  MARKETING: 'Marketing',
  SALES: 'Sales',
  OPERATIONS: 'Operations',
  CUSTOMER_SERVICE: 'Customer Service',
  RESEARCH_AND_DEVELOPMENT: 'Research and Development',
  LEGAL: 'Legal',
  EXECUTIVE: 'Executive'
}

export const Position = {
  INTERN: 'Intern',
  ENTRY_LEVEL: 'Entry Level',
  ASSOCIATE: 'Associate',
  SENIOR_ASSOCIATE: 'Senior Associate',
  MANAGER: 'Manager',
  SENIOR_MANAGER: 'Senior Manager',
  DIRECTOR: 'Director',
  VICE_PRESIDENT: 'Vice President',
  SENIOR_VICE_PRESIDENT: 'Senior Vice President',
  C_LEVEL: 'C-Level Executive',
  CEO: 'Chief Executive Officer'
}