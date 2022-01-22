import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getStatusThuncCreator, setTextStatusThuncCreator, updateNewMessageTextStatus } from "../../../redux/profileReducer";
import s from './ProfileInfo.module.css';

class ProfileStatus extends React.Component {
	constructor(props) {
		super(props);
		this.newStatusElement = React.createRef();
	}
	componentDidMount() {
		this.props.getStatusThuncCreator(this.props.id)
		console.log('я вмонтирована');
	}
	state = {
		editMode: false
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
		this.props.setTextStatusThuncCreator(this.props.statusText);
	}

	updateStatusText = () => {
		let text = this.newStatusElement.current.value;
		this.props.updateNewMessageTextStatus(text);
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
						<input ref={this.newStatusElement} onChange={this.updateStatusText} autoFocus={true} onBlur={this.deactivateEditMode} value={this.props.statusText} />
					</div>
				}
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return ({
		statusText: state.profilePage.newStatusText,
		id: state.profilePage.profile.userId
	})
}

export default compose(
	connect(mapStateToProps, { updateNewMessageTextStatus, setTextStatusThuncCreator, getStatusThuncCreator } ),

)(ProfileStatus);