import { Select } from "antd";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { getUsersFilter } from "../../redux/users-selectors";
import { FilterType } from "../../redux/usersReducer";

type PropsType = {
	onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = React.memo((props) => {
	
	const { register, setValue, handleSubmit, formState: { errors } } = useForm<FilterType>();
	const onSubmit = handleSubmit(data => {
		props.onFilterChanged(data)
	});
	
	const filter = useSelector(getUsersFilter)
	setValue('term', filter.term)
	setValue('friend', filter.friend)


	return <div>
		<form onSubmit={onSubmit}>
			<input {...register("term"/* , { required: 'Field is requared' } */)} />
			<select {...register("friend")}>
				<option value='null'>All</option>
				<option value='true'>Only followed</option>
				<option value='false'>Only unfolloewd</option>
			</select>
			<button
				type="button"
				onClick={() => { onSubmit() }}
			>
				Search
			</button>
		</form>
	</div>
})

export default UsersSearchForm