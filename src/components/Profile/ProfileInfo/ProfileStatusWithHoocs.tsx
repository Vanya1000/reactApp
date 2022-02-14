import React, { ChangeEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { getStatusThuncCreator, updateTextStatusThuncCreator } from "../../../redux/profileReducer";
import { AppStateType } from "../../../redux/redux-store";
import s from './ProfileInfo.module.css';

//todo избавиться от connect и перенести его в контейнер выше

type PropsType = {
	statusText: string
	updateTextStatusThuncCreator: (status: string) => void
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
	let [editMode, setEditMode] = useState(false);
	let [status, setStatus] = useState(props.statusText);
	useEffect(() => {
		setStatus(props.statusText)
	}, [props.statusText]);

	const activateEditMode = () => {
		setEditMode(true)
	}

	const deactivateEditMode = () => {
		setEditMode(false)
		props.updateTextStatusThuncCreator(status);
	}

	const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
		setStatus(e.currentTarget.value);
	}

	return (
		<div>
			{!editMode &&
				<div>
					<span onClick={activateEditMode}>{props.statusText}</span>
				</div>
			}
			{editMode &&
				<div>
					<input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status} />
				</div>
			}
		</div>
	)
}

const mapStateToProps = (state:AppStateType) => {
	return ({
		statusText: state.profilePage.newStatusText,
	})
}

export default compose(
	connect(mapStateToProps, { updateTextStatusThuncCreator }),

)(ProfileStatusWithHooks);
