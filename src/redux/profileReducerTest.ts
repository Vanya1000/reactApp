import { PostType } from './../types/types';
import profileReducer, { actions} from "./profileReducer";
import React from 'react';
import { ProfileType } from '../types/types';

let state = {
	posts: [
		{ id: 1, message: 'Hi, how a you?', likesCount: 15 },
		{ id: 2, message: 'Its my first post!', likesCount: 2 }
	],
	profile: null,
	newStatusText: '-----'
};
actions
test('length of posts should be incremented', () => {
	// 1. test data
	let action = actions.addPost('text');
	// 2.action 
	let newState = profileReducer(state, action);
	// 3.expectation
	expect(newState.posts.length).toBe(3);
});

test('message of new post should be correct', () => {
	// 1. test data
	let action = actions.addPost('text');
	// 2.action 
	let newState = profileReducer(state, action);
	// 3.expectation
	expect(newState.posts[3].message).toBe("text");
});

test('after deleting length of messages should be decrement', () => {
	// 1. test data
	let action = actions.deletePost(1);
	// 2.action 
	let newState = profileReducer(state, action);
	// 3.expectation
	expect(newState.posts.length).toBe(1);
});