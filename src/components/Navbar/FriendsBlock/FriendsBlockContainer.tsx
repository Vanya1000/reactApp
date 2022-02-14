import React from "react";
import { connect } from 'react-redux';
import { AppStateType } from "../../../redux/redux-store";
import FriendsBlock from './FriendsBlock';
import s from './FriendsBlock.module.css';
import FriendsItem from './FriendsItem/FriendsItem';


const mapStateToProps = (state: AppStateType) => {
	return {
		friends: state.sidebar.friends
	}
}


const FriendsBlockContainer = connect(mapStateToProps, {})(FriendsBlock)

export default FriendsBlockContainer;