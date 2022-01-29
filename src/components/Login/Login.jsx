import React from "react";
import { useForm, Controller } from "react-hook-form";
import s from './Login.module.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { connect } from "react-redux";
import { loginTC } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";

const Loginform = ({ isWrong, onSubmitCall}) => {
	const { control, register, handleSubmit, reset, formState: { errors } } = useForm();
	const onSubmit = (formData) => {
		onSubmitCall(formData);
		reset();
	}
	return (
		<div className={s.formBlock}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div>
					<div>
						{isWrong && <p>login/password incorrect</p>}
					</div>
					<Controller
						name="email"
						control={control}
						rules={{ required: 'First name required' }}
						render={({ field: { onChange, value } }) => (
							<Input
								value={value}
								onChange={onChange}
								placeholder="login"
								className={(errors?.email || isWrong) && s.error}
							/>
						)}
					/>
				</div>
				<div>
					<Controller
						name="password"
						control={control}
						rules={{ required: true }}
						render={({ field: { onChange, value } }) => (
							<Input.Password
								value={value}
								onChange={onChange}
								placeholder="password"
								className={(errors?.password || isWrong) && s.error}
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
	const onSubmitCall = formData => {
		props.loginTC(formData.email, formData.password, formData.rememberMe);
	}
	if (props.isAuth) {
		return <Redirect to={"/profile"} />
	}
	return <div>
		<h1 className={s.title}>Login</h1>
		<Loginform isWrong={props.isWrong} onSubmitCall={onSubmitCall} />
	</div>
}
const mapStateToProps= (state) => ({
	isAuth: state.auth.isAuth,
	isWrong: state.auth.isWrong
})
export default connect(mapStateToProps, { loginTC}) (Login);

