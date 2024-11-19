type Props = {
	children: React.ReactNode;
};

const H1_Heading = ({ children }: Props) => {
	return <h1 className="text-3xl font-bold text-gray-900">{children}</h1>;
};

export default H1_Heading;
