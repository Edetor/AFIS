import { Box, Button, Grid, Grid2, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AddTaskIcon from '@mui/icons-material/AddTask';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import LogoDevIcon from '@mui/icons-material/LogoDev';
import ThemeToggleButton from "../ThemeToggleButton";

interface Page {
	name: string;
	icon: JSX.Element;
}


const pages: Page[] = [
	{ name: 'Goals', icon: <AddTaskIcon /> },
	{ name: 'Typing', icon: <EditNoteIcon /> },
	{ name: 'Blog', icon: <LocalLibraryIcon />},
];

const Navbar = () => {

	return (
		<Box
			height={'100%'}
			width={160}
			position={'fixed'}
			zIndex={1}
			top={0}
			left={0}
			bgcolor={'var(--navbar-background)'}
		>
			
			<Box
				margin={'auto'}
				textAlign={'center'}
				color="#fff"
				paddingTop={'10px'}
				paddingBottom={'10px'}
				borderBottom={'1px solid #505050'}
				marginBottom={'10px'}
				display={'flex'}
				flexDirection={'row'}
				gap={'5px'}
				justifyContent={'center'}
			>
				<LogoDevIcon 
					sx={{
						fontSize:'40px',
						color:'var(--text-color)',
					}}
				/>
				<Typography 
					fontSize={'30px'}
					color={'var(--text-color)'}
				>
					AFIS
				</Typography>
			</Box>

			<Grid2 container spacing={2}
				borderBottom={'1px solid #505050'}
			>
				{pages.map((page) => (

					<Link to={page.name}>
						<Grid2
							paddingLeft={'10px'}
						>
							<Button

								sx={{
									color: 'var(--text-color)',
									verticalAlign: 'middle',
									gap: '5px',
									'&:hover': {
										backgroundColor: 'var(--hover-navbar)',
										color: 'var(--hover-text)',
									},
								}}
							>
								{page?.icon}
								<Typography>
									{page?.name}
								</Typography>
							</Button>
						</Grid2>
					</Link>
				))}
			</Grid2>
			
			<Box
				textAlign={'center'}
			>
				<ThemeToggleButton/>
			</Box>


		</Box>
	)
}

export default Navbar;