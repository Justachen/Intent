import create from 'zustand'

const useStore = create((set) => ({
	isUserLoggedIn: false,
	jwt: null,
	setJWT: (token) => set(state => ({ jwt: state.jwt = token})),
	toggleLoggedIn: () => set(state => ({ isUserLoggedIn: !state.isUserLoggedIn })),
}));

export default useStore;