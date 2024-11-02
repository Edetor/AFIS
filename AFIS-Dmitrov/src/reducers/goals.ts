import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Goal {
	task: string;
	id: number;
	completed?: boolean;
}

interface GoalsState {
	goalsList: Goal[];
	sortCriteria: string;
}

const initialState : GoalsState = {
	goalsList : [],
	sortCriteria: "All",
}

const GoalsSlice = createSlice({
	name: "goals",
	initialState,
	reducers: {
		setGoalsList: (state, action: PayloadAction<Goal[]>) => {
			state.goalsList = action.payload;
		},

		addGoal: (state, action: PayloadAction<Goal>) => {
			state.goalsList.push({
				task: action.payload.task,
				id: action.payload.id,
				completed: false,
			}	
			)
		},

		sortGoal: (state, action: PayloadAction<string>) => {
			state.sortCriteria = action.payload;
		},

		updateGoal: (state, action) => {
			const { id , task} = action.payload;
			const index = state.goalsList.findIndex((goal) => goal.id === id);
			state.goalsList[index].task = task;
		},

		toggleCompleted: (state, action) => {
			const { id } = action.payload;
			const index = state.goalsList.findIndex((goal) => goal.id === id);
			state.goalsList[index].completed = !state.goalsList[index].completed;
		}
	}
})



export const {
	setGoalsList, addGoal, sortGoal, updateGoal, toggleCompleted
} = GoalsSlice.actions

export default GoalsSlice.reducer;