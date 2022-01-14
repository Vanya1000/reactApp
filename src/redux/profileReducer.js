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
		case ADD_POST: {
			let body = state.newPostText;
			return { 
				...state,
				posts: [...state.posts, { id: 5, message: body, likesCount: 0 }],
				newPostText: ''
			};
		}
		case UPDATE_NEW_POST_TEXT: {
			return { 
				...state, 
				newPostText: action.newText
			};
		}
		default:
			return state;
	}
}

export const addPostActionCreator = () => ({ type: ADD_POST });
{/*Вспомогательная функция которая помогает не ошибиться в созд action */ }

export const updateNewPostTextActionCreator = (textCh) =>
	({ type: UPDATE_NEW_POST_TEXT, newText: textCh });
	
export default profileReducer;