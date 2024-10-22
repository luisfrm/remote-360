import { FunctionComponent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Bell } from "lucide-react";

interface NavigationProps {
	NavLinks: FunctionComponent;
}

const Navigation: FunctionComponent<NavigationProps> = ({ NavLinks }) => {
	const { user } = useSelector((state: RootState) => state.auth);

	return (
		<>
				{/* Header */}
				<header className="bg-gray-800 shadow-sm z-10">
					<div className="mx-auto px-4 sm:px-6 lg:px-8">
						<div className="flex justify-between h-16">
							<div className="flex">
								<div className="flex-shrink-0 flex items-center">
									{/* Mobile menu button */}
									<Sheet>
										<SheetTrigger asChild>
											<Button
												variant="ghost"
												size="icon"
												className="md:hidden text-white"
											>
												<Menu className="h-6 w-6" />
											</Button>
										</SheetTrigger>
										<SheetContent
											side="left"
											className="w-screen sm:w-[240px] bg-gray-800"
										>
											<nav className="flex flex-col space-y-4 mt-5">
												<NavLinks />
											</nav>
										</SheetContent>
									</Sheet>
								</div>
							</div>
							<div className="flex items-center">
								<Button variant="ghost" size="icon" className="mr-4 text-white">
									<Bell className="h-5 w-5" />
								</Button>
								<span className="text-white">{user?.email}</span>
							</div>
						</div>
					</div>
				</header>
		</>
	);
};

export default Navigation;
