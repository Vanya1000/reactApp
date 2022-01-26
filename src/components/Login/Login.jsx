import React from "react";
import { useForm, Controller } from "react-hook-form";
import { UserOutlined } from '@ant-design/icons';
import s from './Login.module.css';
import { Form, Input, Button, Checkbox } from 'antd';

const Loginform = (props) => {
	const { control, register, handleSubmit, reset, formState: { errors } } = useForm();
	const onSubmit = data => {
		console.log(data);
		reset();
	}
	return (
		<div className={s.formBlock}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<Controller
						name="login"
						control={control}
						rules={{ required: 'First name required' }}
						render={({ field: { onChange, value } }) => (
							<Input
								value={value}
								onChange={onChange}
								placeholder="login"
								className={errors?.login && s.error}
							/>
						)}
					/>
				</div>
				<div>
					<Controller
						name="password"
						control={control}
						rules={{ required: 'First name required' }}
						render={({ field: { onChange, value } }) => (
							<Input.Password
								value={value}
								onChange={onChange}
								placeholder="password"
								className={errors?.password && s.error}
							/>
						)}
					/>
				</div>
				<div>
					<Controller
						defaultValue="false"
						name="rememberMe"
						control={control}
						render={({ field: { onChange, value } }) => (
							<Checkbox
								value={value}
								onChange={onChange}
								checked={false}
							>Remember me</Checkbox>
						)}
					/>
				</div>
				<div>
					<Button type="primary" htmlType="submit" onSubmit={handleSubmit(onSubmit)}>
						Submit
					</Button>
				</div>
			</form>
		</div>
	)
}



const Login = (props) => {
	return <div>
		<h1 className={s.title}>Login</h1>
		<Loginform />
	</div>
}

export default Login;
/* const { register, handleSubmit, reset, formState: { errors } } = useForm();
const onSubmit = data => {
	console.log(data);
	reset();
} */
{/* <div className={s.formBlock}>
	<form onSubmit={handleSubmit(onSubmit)}>
		<div>
			<input className={errors?.login && s.error} placeholder={"login"} {...register("login",
				{ required: 'Field is requared' })} />
		</div>
		<div style={{ color: 'red' }}>
			{errors?.login && <p>{errors?.login?.message || "Error!"}</p>}
		</div>
		<div>
			<input className={errors?.password && s.error} type={"password"} placeholder={"password"} {...register("password", { required: 'Field is requared' })} />
		</div>
		<div style={{ color: 'red' }}>
			{errors?.password && <p>{errors?.password?.message || "Error!"}</p>}
		</div>
		<div>
			<input type={"checkbox"}  {...register("rememberMe")} />remember me
		</div>
		<div>
			<input type="submit" />
		</div>
	</form>
</div> */}

