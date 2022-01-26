import React from 'react';
import { connect } from 'react-redux';
import { addPost} from '../../../redux/profileReducer';
import MyPosts from './MyPosts';

const mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		addPost: (post) => {
			dispatch(addPost(post));
		}
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer;