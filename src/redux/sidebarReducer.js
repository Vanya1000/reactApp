let initialState = {
	friends: [
		{ id: 1, name: 'Alex' },
		{ id: 2, name: 'Kesha' },
		{ id: 3, name: 'Dino' },
	]
};

const sidebarReducer = (state = initialState, action) => {
	return state;
}

export default sidebarReducer;