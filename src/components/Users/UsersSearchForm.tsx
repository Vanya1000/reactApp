import React from "react";
import { useForm } from "react-hook-form";


type FormData = {
	term: string;
};

const UsersSearchForm = () => {
	const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
	const onSubmit = handleSubmit(data => console.log(data));

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