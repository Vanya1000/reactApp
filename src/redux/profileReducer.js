const ADD_POST = 'ADD-POST'; {/*action type*/ } {/*используем вместо строк что бы не опечататься*/ }
const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';

let initialState = {
	posts: [
		{ id: 1, message: 'Hi, how a you?', likesCount: 15 },
		{ id: 2, message: 'Its my first post!', likesCount: 2 }
	],
	newPostText: ''
};

const profileReducer = (state = initialState, action) => {
	switch(action.type) {
		case ADD_POST:
			let newPosts = {
				id: 5,
				message: state.newPostText,
				likesCount: 0
			};
			state.posts.push(newPosts);
			state.newPostText = '';
			return state;
		case UPDATE_NEW_POST_TEXT:
			state.newPostText = action.newText;
			return state;
		default:
			return state;
	}
}

export const addPostActionCreator = () => ({ type: ADD_POST });
{/*Вспомогательная функция которая помогает не ошибиться в созд action */ }

export const updateNewPostTextActionCreator = (textCh) =>
	({ type: UPDATE_NEW_POST_TEXT, newText: textCh });
	
export default profileReducer;