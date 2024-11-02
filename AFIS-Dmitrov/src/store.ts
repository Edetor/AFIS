import { configureStore } from '@reduxjs/toolkit';
import goalsReducer from './reducers/goals'

const store = configureStore({
	reducer: {
		goals: goalsReducer,
	},

})

export type RootState = ReturnType<typeof store.getState>

export default store;