let rerenderEntireTree = () => {
	console.log('State changed');
}

let state = {
	profilePage: {
		posts: [
			{ id: 1, message: 'Hi, how a you?', likesCount: 15 },
			{ id: 2, message: 'Its my first post!', likesCount: 2 }
		],
		newPostText : ''
	},
	dialogsPage: {
		dialogs: [
			{ id: 1, name: 'Ivan' },
			{ id: 2, name: 'Alex' },
			{ id: 3, name: 'Kesha' },
			{ id: 4, name: 'Dino' }
		],
		messages: [
			{ id: 1, message: 'What you name?' },
			{ id: 2, message: 'Tony' },
			{ id: 3, message: 'Fack you Tony!' },
			{ id: 4, message: 'What you name?' }
		],
		newMessageText : ''
	},
	sidebar: {
		friends: [
			{ id: 1, name: 'Alex' },
			{ id: 2, name: 'Kesha' },
			{ id: 3, name: 'Dino' },
		]
	}
}

export const addPost = () => {
	let newPosts = {
		id: 5,
		message: state.profilePage.newPostText,
		likesCount: 0
	};
	state.profilePage.posts.push(newPosts);
	state.profilePage.newPostText = '';
	rerenderEntireTree(state);
}

export const updateNewPostText = (newText) => {
	state.profilePage.newPostText = newText;
	rerenderEntireTree(state);
}


export const addMessage = () => {
	let newMessage = {
		id: 5,
		message: state.dialogsPage.newMessageText,
	};
	state.dialogsPage.messages.push(newMessage);
	state.dialogsPage.newMessageText = '';
	rerenderEntireTree(state);
}

export const updateNewMessageText = (newText) => {
	state.dialogsPage.newMessageText = newText;
	rerenderEntireTree(state);
}

export const subscribe = (observer) => {
	rerenderEntireTree = observer;
}

export default state;