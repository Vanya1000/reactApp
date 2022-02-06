type FriendsType = {
	id: number
	name: string
}

let initialState = {
	friends: [
		{ id: 1, name: 'Alex' },
		{ id: 2, name: 'Kesha' },
		{ id: 3, name: 'Dino' },
	] as Array<FriendsType>
};

export type InitialStateType = typeof initialState

const sidebarReducer = (state = initialState, action: any): InitialStateType => {
	return state;
}

export default sidebarReducer;