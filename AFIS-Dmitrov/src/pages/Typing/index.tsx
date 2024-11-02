import { Box, Grid2, Typography } from "@mui/material";
import { paragraphs } from "../../api/pargraphs";
import { useCallback, useEffect, useRef, useState } from "react";
import CachedIcon from '@mui/icons-material/Cached';
import TypingContent from "../../Components/TypingContent";

const dataset = paragraphs;
let randomIndex = Math.floor(Math.random() * dataset.length)



const Typing = () => {
	const maxTime = 60;
	const [data, setData] = useState(dataset[randomIndex]);
	const [word, setWord] = useState('');
	const [charIndex, setCharIndex] = useState(0);
	const [time, setTime] = useState(maxTime);
	const [mistakes, setMistakes] = useState(0);
	const [wpm, setWpm] = useState(0);
	const [cpm, setCpm] = useState(0);
	const [acc, setAcc] = useState(0);

	const totalChars = useRef(0);
	const totalCorrectChars = useRef(0);
	const timer = useRef<number>();

	const callbackRef = useCallback((inputEl: HTMLInputElement | null) => {
		if (inputEl) {
			document.addEventListener("keydown", () => inputEl.focus())
		}
	}, [])

	useEffect(() => {
		if (timer.current && time > 0) {
			timer.current = setTimeout(() => setTime(prev => prev - 1), 1000)
		}

		if (time <= 0) {
			clearTimeout(timer.current);
			return;
		}

	}, [time])

	const handleInput = (e: any) => {
		const { value } = e.target;

		if (time <= 0 || value.length > data.length) return;

		setWord(value);
		setCharIndex(value.length)

		const { mistakes, cpm, wpm } = testCalc(data, value)

		setMistakes(mistakes);
		setCpm(cpm);
		setWpm(wpm);

		testAcc(value, data);

		if (!timer.current) {
			timer.current = setTimeout(() => setTime(prev => prev - 1), 1000)
		}
	}

	function testCalc(correctVal: string, typedVal: string) {

		const mistakes = typedVal.split('').reduce((acc, typedChar, index) => {
			return typedChar !== correctVal[index] ? acc + 1 : acc
		}, 0)

		const cpm = typedVal.length - mistakes;

		const wpm = cpm / 5; // 

		return { mistakes, cpm, wpm }

		console.log({ correctVal: correctVal.split(''), typedVal: typedVal.split('') })
	}

	function testAcc(value: string, data: string) {
		if (value.length > charIndex) {
			totalChars.current += 1;
			if (value[charIndex] === data[charIndex]) {
				totalCorrectChars.current += 1;
			}
			setAcc(totalCorrectChars.current / totalChars.current * 100);
			console.log(totalChars.current, totalCorrectChars.current)
		}
	}

	const handleTryAgain = () => {
		if (time > 0) return;
		handleReset()
	}

	function handleReset() {
		setWord('');
		setCharIndex(0);
		setTime(maxTime);
		setMistakes(0);
		setWpm(0);
		setCpm(0);
		setAcc(0);
		clearTimeout(timer.current);

		totalChars.current = 0
		totalCorrectChars.current = 0
		timer.current = undefined;
	}

	function handleRestart() {
		let ri = Math.floor(Math.random() * dataset.length);

		if (ri !== randomIndex) {
			randomIndex = ri;
			setData(dataset[ri]);
			handleReset()
		} else {
			handleRestart()
		}
	}

	return (

		<Box
			width={'100%'}
			height={'100vh'}
			margin={'auto'}
			textAlign={'center'}
			sx={{
				position: 'relative', 
				'&::before': {
					content: '""',
					position: 'absolute',
					top: 0,
					left: 0,
					width: '100%',
					height: '100%',
					backgroundImage: 'var(--bg-image)', 
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					opacity: 0.3, 
					zIndex: -1, 
				},
			}}
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
					onClick={handleTryAgain}
					sx={{
						cursor: 'pointer',
					}}
					alignContent={'center'}
				>
					{
						time > 0
							?
							<>
								<Typography fontSize={'25px'}>{time}</Typography>
								<Typography>seconds</Typography>
							</>
							: <Typography
								fontSize={'25px'}
							> Try Again!</Typography>
					}
				</Grid2>

				<Grid2
					padding={'15px'}
					borderRadius={'25%'}
					bgcolor={'var(--text-color)'}
					color={'var(--navbar-background)'}
				>
					<Typography fontSize={'25px'}>
						{Math.floor(wpm)}
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
					<Typography fontSize={'25px'}>
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
					<Typography fontSize={'25px'}>
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
					<Typography fontSize={'25px'}>
						{Math.floor(acc)}
					</Typography>
					<Typography>
						% accuracy
					</Typography>
				</Grid2>

			</Grid2>

			<input type="text" value={word} autoFocus
				onChange={handleInput}
				ref={callbackRef}
				style={{ opacity: 0 }}
			/>

			<TypingContent
				data={data}
				word={word}
				charIndex={charIndex}
			/>

			<Box component={'span'} onClick={handleRestart}>
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