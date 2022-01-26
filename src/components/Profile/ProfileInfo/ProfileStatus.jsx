import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getStatusThuncCreator, updateTextStatusThuncCreator } from "../../../redux/profileReducer";
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.statusText !== this.props.statusText) {
			this.setState({
				status: this.props.statusText
			})
		}
	}
	state = {
		editMode: false,
		status: this.props.statusText//берет из state
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

	onStatusChange = (e) => {
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

const mapStateToProps = (state) => {
	return ({
		statusText: state.profilePage.newStatusText,
	})
}

export default compose(
	connect(mapStateToProps, {updateTextStatusThuncCreator } ),

)(ProfileStatus);