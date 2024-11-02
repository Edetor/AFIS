import { Box } from "@mui/material"
import styles from './style.module.scss'

interface TypingContentProps {
	data: string;
	word: string;
	charIndex: number;
}

const TypingContent: React.FC<TypingContentProps> = ({ data, word, charIndex }) => {
	return (
		<Box
			sx={{
				borderBottom: '1px solid #505050',
				borderTop: '1px solid #505050',
				marginBottom: '10px',
			}}
		>
			<Box
				margin={'20px'}
			>
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
		</Box>

	)
}


export default TypingContent;