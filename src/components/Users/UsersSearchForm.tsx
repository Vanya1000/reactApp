import React from "react";
import { useForm } from "react-hook-form";
import { FilterType } from "../../redux/usersReducer";

type PropsType = {
	onFilterChanged: (filter: FilterType) => void
}

const UsersSearchForm: React.FC<PropsType> = (props) => {
	const { register, setValue, handleSubmit, formState: { errors } } = useForm<FilterType>();
	const onSubmit = handleSubmit(data => props.onFilterChanged(data));

	return <div>
		<form onSubmit={onSubmit}>
			<input {...register("term", { required: 'Field is requared' })} />
			<button
				type="button"
				onClick={() => { onSubmit() }}
			>
				Search
			</button>
		</form>
	</div>
}

export default UsersSearchForm