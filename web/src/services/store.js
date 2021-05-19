import create from "zustand";

const useStore = create((set) => ({
	isUserLoggedIn: false,
	toggleLoggedIn: () =>
		set((state) => ({ isUserLoggedIn: !state.isUserLoggedIn })),

	jwt: null,
	setJWT: (token) => set((state) => ({ jwt: (state.jwt = token) })),

	todos: [],
	addTodo: (input) =>
		set((state) => ({ todoInput: [...state.todoInput, input] })),

	pomodoro: 0,
	updatePomodoro: (input) =>
		set((state) => ({ pomodoro: (state.pomodoro = input) })),
}));

export default useStore;
