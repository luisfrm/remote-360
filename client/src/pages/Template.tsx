import { FunctionComponent, ReactNode } from "react";
import { navItems } from "@/lib/constants";
import { logout } from "@/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navigation from "@/components/Navigation";
import { LogOut } from "lucide-react";
import { RootState } from "@/store";
import { Toaster } from "@/components/ui/toaster"

interface TemplateProps {
	children: ReactNode;
}

const Template: FunctionComponent<TemplateProps> = ({ children }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const role = useSelector((state: RootState) => state.auth.user?.role);
	const isUserEmployee = role === "employee";

	const NavLinks = () => (
		<>
			{navItems.map((item) => {
				if (isUserEmployee && item.path === "/employees") {
					return null;
				}
				
				return (
					<Link
						key={item.path}
						to={item.path}
						className={`flex items-center px-4 py-2 rounded-md ${
							location.pathname === item.path
								? "bg-blue-600 text-white"
								: "text-gray-300 hover:bg-gray-700"
						}`}
					>
						{item.icon}
						{item.name}
					</Link>
				);
			} )}
			<Link
					to="#"
					className="flex items-center px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700"
					onClick={() => dispatch(logout())}
				>
					<LogOut className="mr-2" />
					Cerrar sesión
				</Link>
		</>
	);

	return (
		<div className="flex h-dvh bg-gray-100 overflow-hidden">
			<Sidebar NavLinks={NavLinks} />
      {/* Main content */}
			<div className="flex flex-col flex-1">
        {/* Top navigation */}
				<Navigation NavLinks={NavLinks} />

        {/* Page content */}
				<main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
					<div className="max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
						{children}
					</div>
				</main>
			</div>
			<Toaster />
		</div>
	);
};

export default Template;
