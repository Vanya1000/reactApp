import { rerenderEntireTree } from "../render";

let state = {
	profilePage: {
		posts: [
			{ id: 1, message: 'Hi, how a you?', likesCount: 15 },
			{ id: 1, message: 'Its my first post!', likesCount: 2 }
		]},
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
		]},
	sidebar: {
		friends: [
			{ id: 1, name: 'Alex' },
			{ id: 2, name: 'Kesha' },
			{ id: 3, name: 'Dino' },
		]
	}
}

export let addPost = (postMessage) => {
	let newPosts = {
		id: 5,
		message: postMessage,
		likesCount:0
	};
	state.profilePage.posts.push(newPosts)
	rerenderEntireTree(state);
}
export default state;
