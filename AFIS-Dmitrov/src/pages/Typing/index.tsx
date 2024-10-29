import { Box, Grid, Grid2, Typography } from "@mui/material";
import { paragraphs } from "../../api/pargraphs";
import { useCallback, useState } from "react";
import CachedIcon from '@mui/icons-material/Cached';
import styles from './style.module.scss'

const dataset = paragraphs;
const randomIndex = Math.floor(Math.random() * dataset.length)



const Typing = () => {
	const maxTime = 60;


	console.log(dataset);
	const [data, setData] = useState(dataset[randomIndex]);
	const [word, setWord] = useState('');
	const [charIndex, setCharIndex] = useState(0);
	const [time, setTime] = useState(maxTime);
	const [mistakes, setMistakes] = useState(0);
	const [wpm, setWpm] = useState(0);
	const [cpm, setCpm] = useState(0);
	const [acc, setAcc] = useState(0);

	const handleInput = (e: any) => {
		const { value } = e.target;

		setWord(value);
		setCharIndex(value.length)
	}

	const callbackRef = useCallback(inputEl => {
		if(inputEl){
			document.addEventListener("keydown", () => inputEl.focus())
		}
	}, [])

	return (
		<Box
			width={'100%'}
			height={'100vh'}
			margin={'auto'}
			textAlign={'center'}
		>
			<Typography variant="h1" marginBottom={'50px'}>
				Typing speed test
			</Typography>

			<Grid2
				container
				justifyContent={'space-around'}
				maxWidth={'1024px'}
				margin={'auto'}
			>
				<Grid2
					padding={'15px'}
					borderRadius={'25%'}
					bgcolor={'var(--text-color)'}
					color={'var(--navbar-background)'}
				>
					{
						time > 0
							?
							<>
								<Typography fontSize={'25px'}>{time}</Typography>
								<Typography>seconds</Typography>
							</>
							: <Typography> Try Again</Typography>
					}
				</Grid2>

				<Grid2
					padding={'15px'}
					borderRadius={'25%'}
					bgcolor={'var(--text-color)'}
					color={'var(--navbar-background)'}
				>
					<Typography  fontSize={'25px'}>
						{wpm}
					</Typography>
					<Typography>
						words/min
					</Typography>
				</Grid2>

				<Grid2
					padding={'15px'}
					borderRadius={'25%'}
					bgcolor={'var(--text-color)'}
					color={'var(--navbar-background)'}
				>
					<Typography  fontSize={'25px'}>
						{cpm}
					</Typography>
					<Typography>
						chars/min
					</Typography>
				</Grid2>

				<Grid2
					padding={'15px'}
					borderRadius={'25%'}
					bgcolor={'var(--text-color)'}
					color={'var(--navbar-background)'}
				>
					<Typography  fontSize={'25px'}>
						{cpm}
					</Typography>
					<Typography>
						chars/min
					</Typography>
				</Grid2>

				<Grid2
					padding={'15px'}
					borderRadius={'25%'}
					bgcolor={'var(--text-color)'}
					color={'var(--navbar-background)'}
				>
					<Typography  fontSize={'25px'}>
						{mistakes}
					</Typography>
					<Typography>
						mistakes
					</Typography>
				</Grid2>

				<Grid2
					padding={'15px'}
					borderRadius={'25%'}
					bgcolor={'var(--text-color)'}
					color={'var(--navbar-background)'}
				>
					<Typography  fontSize={'25px'}>
						{acc}
					</Typography>
					<Typography>
						% accuracy
					</Typography>
				</Grid2>

			</Grid2>

			<input type="text" value={word}  autoFocus 
			onChange={handleInput}
			ref={callbackRef}
			/>

			<Box margin={'20px'}>
				{
					data.split('').map((char: string, index: number) => (
						<Box 
							component={'span'}  
							key={index} 
							fontSize={'25px'}
							className={`
								${styles.text}

								${index === charIndex ? `${styles.active}` : ''}
								${word[index] === char 
									? `${styles.correct}` 
									: index < charIndex ? `${styles.incorrect}` : ''
								}
							`}
						>
							{char}
						</Box>
					))
				}
			</Box>		

			<Box component={'span'}>
				<CachedIcon
					fontSize="large" 
					sx={{
						cursor: 'pointer',
					}}
				/>
			</Box>
		</Box>
	)
}

export default Typing;