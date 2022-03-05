import React from "react";
import { useForm, Controller, NestedValue } from "react-hook-form";
import s from './Login.module.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { connect, useDispatch, useSelector } from "react-redux";
import { loginTC } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";

type PropsType = {
	captchaUrl: string | null
	isWrong: boolean
	onSubmitCall: (formData: LoginFormValuesType) => void
}

const Loginform: React.FC<PropsType> = ({ isWrong, onSubmitCall, captchaUrl}) => {
	const { control, register, handleSubmit, reset, formState: { errors } } = useForm();
	const onSubmit = (formData:any) => {
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
				{captchaUrl && <img src={captchaUrl} />}
				{captchaUrl && <input type="text" {...register("captcha")} />}
				<div>
					<Button type="primary" htmlType="submit" onSubmit={handleSubmit(onSubmit)}>
						Submit
					</Button>
				</div>
			</form>
		</div>
	)
}












type LoginFormValuesType = {
	email: string
	password: string
	rememberMe: boolean
	captcha: string
}




export const Login: React.FC = () => {
	const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
	const isAuth = useSelector((state: AppStateType) => state.auth.captchaUrl)
	const isWrong = useSelector((state: AppStateType) => state.auth.isWrong)

	const dispatch = useDispatch()



	const onSubmitCall = (formData: LoginFormValuesType) => {
		dispatch(loginTC(formData.email, formData.password, formData.rememberMe, formData.captcha))
	}
	if (isAuth) {
		return <Redirect to={"/profile"} />
	}
	return <div>
		<h1 className={s.title}>Login</h1>
		<Loginform isWrong={isWrong} onSubmitCall={onSubmitCall} captchaUrl={captchaUrl}/>
	</div>
}


