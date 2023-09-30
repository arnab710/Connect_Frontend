import React, { useEffect, useReducer } from "react";
import style from "./LoginForm.module.css";
import Icon from "../Icon/Icon";
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";
import { loginReducer } from "../../Reducers/LoginReducer";
import useLogin from "../../Hooks/useLogin";
import { loginUserInfo } from "../../Types/loginUserType";
import { Action } from "../../Types/signupUserType";
import SmallBtnSpinner from "../SmallBtnSpinner/SmallBtnSpinner";

const initialState: loginUserInfo = {
	email: "",
	password: "",
};
const LoginForm: React.FC = () => {
	const [userInfo, loginDispatch] = useReducer(loginReducer, initialState) as [loginUserInfo, React.Dispatch<Action>];
	const { mutate, isLoading, isError } = useLogin();

	const handleSubmit = () => {
		mutate({ email: userInfo.email, password: userInfo.password });
	};

	useEffect(() => {
		if (isError) loginDispatch({ type: "RESET_FIELDS" });
	}, [isError]);

	return (
		<div className={style.loginFormDiv}>
			<Icon classStyle={style.iconStyle} />
			<p className={style.iconTagLine}>Welcome to Connect, Your Hub for Authentic Connections and Shared Experiences</p>
			<div className={style.inputDiv}>
				<Input
					inputName="Email Address"
					placeholderName="john@gmail.com"
					inputType="email"
					styleClass={style.inputComponent}
					iconType="email"
					stateValue={userInfo.email}
					dispatchfxn={loginDispatch}
					dispatchType="CHANGE_EMAIL"
					isLoginInput={true}
				/>
				<Input
					inputName="Your Password"
					placeholderName="●●●●●●●●●●●●●"
					inputType="password"
					styleClass={style.passwordComponent}
					iconType="password"
					stateValue={userInfo?.password}
					dispatchfxn={loginDispatch}
					dispatchType="CHANGE_PASSWORD"
					isLoginInput={true}
				/>
				<Link className={style.forgotPasswordLink} to="/forgot-password">
					Forgot Password?
				</Link>
				<button className={style.signInBtn} onClick={handleSubmit} disabled={isLoading}>
					{isLoading ? (
						<p>
							<SmallBtnSpinner />
						</p>
					) : (
						`SIGN IN`
					)}
				</button>
				<p className={style.noAccPara}>
					Don&apos;t Have An Account?{" "}
					<Link to="/signup" className={style.SignUpLink}>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
};

export default LoginForm;
