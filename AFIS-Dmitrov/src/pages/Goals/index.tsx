import { Box, Button, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	setGoalsList,
	addGoal,
	sortGoal,
	updateGoal,
	toggleCompleted,
	Goal
} from "../../reducers/goals"
import { RootState } from "../../store";
import { useEffect, useState } from "react";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';

const Goals = () => {
	const dispatch = useDispatch();
	const goalsList = useSelector((state: RootState) => state.goals.goalsList)
	const sortCriteria = useSelector((state: RootState) => state.goals.sortCriteria)

	const [showModal, setShowModal] = useState(false);
	const [currentGoal, setCurrentGoal] = useState<Goal | null>(null);
	const [newTask, setNewTask] = useState('')

	useEffect(() => {
		if (goalsList.length > 0) {
			localStorage.setItem("goalsList", JSON.stringify(goalsList))
		}
	}, [goalsList])

	useEffect(() => {
		const localGoalsList = localStorage.getItem("goalsList");
		if (localGoalsList) {
			const parsedGoalsList = JSON.parse(localGoalsList);
			dispatch(setGoalsList(parsedGoalsList));
		}
	}, [])

	const handleAddGoal = (task: string) => {
		if (task.trim().length === 0) {
			alert('Please enter goal')
		} else {
			dispatch(addGoal({
				task: task,
				id: Date.now(),
			}))
			setNewTask('');
			setShowModal(true);
		}
	}

	const handleSort = (sortCriteria : any) => {
		dispatch(sortGoal(sortCriteria))
	}

	const sortGoalsList = goalsList.filter(goal => {
		if (sortCriteria === "All") return true;
		if (sortCriteria === "Completed" && goal.completed) return true;
		if (sortCriteria === "Not Completed" && !goal.completed) return true;
		return false
	})

	const handleAddClick = () => {
		handleAddGoal(newTask);
		setShowModal(false);
	}

	const handleUpdateGoalsList = (id: number, task: string) => {
		if (task.trim().length === 0) {
			alert('Please enter goal')
		} else {
			dispatch(updateGoal({
				task: task,
				id: id,
			}))
			setShowModal(false);
		}
	}

	const handleDeleteGoal = (id: number) => {
		const updatedGoalsList = goalsList.filter((goal) => goal.id != id);
		dispatch(setGoalsList(updatedGoalsList));
		localStorage.setItem("goalsList", JSON.stringify(updatedGoalsList))
	}

	const handleToggleComplete = (id: number) => {
		dispatch(toggleCompleted({ id }))
	}

	return (
		<Box
			height={"100vh"}
		>
			<Typography variant="h2" component="h2" textAlign={"center"} marginBottom={'20px'}>
				Dmitrov Goals list
			</Typography>
			<Box textAlign={'center'} marginBottom={'20px'}>
				<InputLabel id="sortGoals" sx={{ color: 'var(--text-color)' }}>Sort by</InputLabel>
				<Select
					labelId="sortGoals"
					onChange={e => handleSort(e.target.value)}
					sx={{
						width: '200px',
						color: 'var( --content-background)',
						bgcolor: 'var(--text-color)',
						textAlign: 'center',
					}}
				>
					<MenuItem value={'All'}>All</MenuItem>
					<MenuItem value={'Completed'}>Completed</MenuItem>
					<MenuItem value={'Not Completed'}>Not Completed</MenuItem>
				</Select>	
			</Box>
			

			<Box textAlign={'center'} margin={'auto'} marginBottom={'15px'}>
				{goalsList.length === 0 ?
					<Box>
						<Typography fontSize={'36px'}>
							Goals list is empty!
						</Typography>
					</Box> :
					<Box>
						{sortGoalsList.map((goal: Goal) => (
							<Box
								key={goal.id}
								display={'flex'}
								justifyContent={'space-between'}
								width={'80%'}
								margin={'auto'}
								bgcolor={'var(--goals-background)'}
								color={'var(--goals-text-color)'}
								marginBottom={'10px'}
								padding={'15px'}
								borderRadius={'10px'}
							>
								<Box
									component={'span'}
									onClick={() =>
										handleToggleComplete(goal.id)}
									sx={{ textDecoration: goal.completed ? 'line-through' : 'none' }}
								>
									<Typography fontSize={'30px'}>
										{goal.task}
									</Typography>
								</Box>

								<Box>
									<Button
										onClick={() => {
											setShowModal(true);
											setCurrentGoal(goal);
											setNewTask(goal.task)
										}}
									>
										<CreateIcon />
									</Button>
									<Button color="error" onClick={() => handleDeleteGoal(goal.id)}>
										<DeleteIcon />
									</Button>
								</Box>
							</Box>
						))}
					</Box>
				}
			</Box>

			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Button
					variant="contained"
					onClick={() => setShowModal(true)}
					sx={{
						width: '200px',
						height: '50px',
						borderRadius: '5px',
						color: '#F9C5B6',
						bgcolor: '#5E2C63',
						fontSize: '20px',
						border: '1px solid #861D75',
						textTransform: 'none'
					}}
				>
					Add Goal
				</Button>
			</Box>





			{/* // Ниже модалка */}
			{showModal && (
				<Box
					sx={{
						position: 'fixed',
						width: '100%',
						height: '100%',
						top: '0',
						left: '160px',
						bgcolor: 'rgb(0,0,0,0.7)',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						textAlign: 'center',
					}}
				>
					<Box

						display={"flex"}
						flexDirection={"column"}
						justifyContent={"space-around"}
						sx={{
							padding: '15px',
							bgcolor: '#fff',
							borderRadius: '30px',
							border: '1px solid mistyrose',
							height: '180px',
							width: '500px',
						}}
					>

						{/* На TextField заменить и добавить в форму */}
						<TextField
							type="text"
							variant="standard"
							value={newTask}
							onChange={(e) => setNewTask(e.target.value)}
							placeholder={currentGoal ? "Update your goal here !" : "Enter your goal here !"}
							sx={{
								width: '80%',
								margin: 'auto',
							}}
							autoFocus
						/>
						<Box
							display={"flex"}
							justifyContent={"end"}
							gap={3}
						>
							{currentGoal ? <>
								<Button variant="contained" color="success" size="large"
									onClick={() => {
										setShowModal(false);
										handleUpdateGoalsList(currentGoal.id, newTask);
									}}
								>
									Save
								</Button>
								<Button variant="contained" color="error" size="large"
									onClick={() => setShowModal(false)}
								>
									Cancel
								</Button>
							</> : <>
								<Button variant="contained" color="success" size="large"
									onClick={handleAddClick}
									sx={{
										borderRadius: '20px'
									}}
								>Add
								</Button>
								<Button variant="contained" color="error" size="large"
									onClick={() => setShowModal(false)}
									sx={{
										borderRadius: '20px'
									}}
								>Cancel
								</Button>
							</>}
						</Box>
					</Box>
				</Box>
			)}
		</Box>
	)
}

export default Goals;