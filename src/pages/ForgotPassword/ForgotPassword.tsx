import React, { useEffect } from "react";
import style from "./ForgotPassword.module.css";
import LoginSlider from "../../features/loginSlider/LoginSlider";
import ForgotPasswordForm from "../../features/ForgotPasswordForm/ForgotPasswordForm";
import { useLocation } from "react-router-dom";

const ForgotPassword: React.FC = () => {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<div className={style.forgotPasswordDiv}>
			<LoginSlider />
			<ForgotPasswordForm />
		</div>
	);
};

export default ForgotPassword;
