import React from "react";
import { connect } from 'react-redux';
import FriendsBlock from './FriendsBlock';
import s from './FriendsBlock.module.css';
import FriendsItem from './FriendsItem/FriendsItem';


const mapStateToProps = (state) => {
	return {
		friends: state.sidebar.friends
	}
}

const mapDispatchToProps = (dispatch) => {
	return {

	}
}

const FriendsBlockContainer = connect(mapStateToProps, mapDispatchToProps)(FriendsBlock)

export default FriendsBlockContainer;