import React, { ChangeEvent } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { updateTextStatusThuncCreator } from "../../../redux/profileReducer";
import { AppStateType } from "../../../redux/redux-store";

type OwnPropsType = {
}

type MapStatePropsType = {
	statusText: string
}

type MapDispatchPropsType = {
	updateTextStatusThuncCreator: (newStatusText: string) => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

type StateType = {
	editMode: boolean
	status: string
}

class ProfileStatus extends React.Component<PropsType, StateType> {
	state = {
		editMode: false,
		status: this.props.statusText//берет из state
	}
	componentDidUpdate(prevProps:PropsType, prevState: StateType) {
		if (prevProps.statusText !== this.props.statusText) {
			this.setState({
				status: this.props.statusText
			})
		}
	}
	
	activateEditMode = () => {
		this.setState({
			editMode: true
		})
	}

	deactivateEditMode = () => {
		this.setState({
			editMode: false
		});
		this.props.updateTextStatusThuncCreator(this.state.status);
	}

	onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		this.setState({
			status: e.currentTarget.value
		})
	}
	render () {
		return (
			<div>
				{!this.state.editMode && 
					<div>
						<span onClick={this.activateEditMode}>{this.props.statusText}</span>
					</div>
				}
				{this.state.editMode &&
					<div>
						<input onChange={this.onStatusChange} autoFocus={true} onBlur={this.deactivateEditMode} value={this.state.status} />
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return ({
		statusText: state.profilePage.newStatusText,
	})
}

export default compose(
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType> (
		mapStateToProps, {updateTextStatusThuncCreator } ),

)(ProfileStatus);