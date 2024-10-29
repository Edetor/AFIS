import { FC, ReactNode } from "react";
import Navbar from "../Navber";
import { Box } from "@mui/material";



interface BaseTemplateProps {
	children: ReactNode;
}

const BaseTemplate: FC<BaseTemplateProps> = ({ children }) => {
	return (
		<>
			<Navbar />
			<Box 
				maxWidth={'100%'}
				margin={'0 auto'}
				bgcolor={'var(--background-color)'}
				marginLeft={'160px'}
				color={'var(--text-color)'}
			>{children}</Box>
		</>
	);
};

export default BaseTemplate;