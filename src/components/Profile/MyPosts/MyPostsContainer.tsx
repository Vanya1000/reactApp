import React from 'react';
import { connect } from 'react-redux';
import { actions} from '../../../redux/profileReducer';
import { AppStateType } from '../../../redux/redux-store';
import MyPosts, { DispatchPropsType, MapPropsType } from './MyPosts';


const { addPost } = actions

const mapStateToProps = (state: AppStateType) => {
	return {
		posts: state.profilePage.posts,
	}
}



const MyPostsContainer = connect<MapPropsType, DispatchPropsType, {}, AppStateType>(mapStateToProps, {addPost})(MyPosts)

export default MyPostsContainer;