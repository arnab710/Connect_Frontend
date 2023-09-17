import React, { useEffect } from "react";
import LoginSlider from "../../features/loginSlider/LoginSlider";
import LoginForm from "../../features/loginForm/LoginForm";
import style from "./Login.module.css";
import { useLocation } from "react-router-dom";

const Login: React.FC = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<div className={style.loginDiv}>
			<LoginSlider />
			<LoginForm />
		</div>
	);
};

export default Login;
