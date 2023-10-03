import React, { useEffect } from "react";
import LoginSlider from "../../features/loginSlider/LoginSlider";
import ResetPasswordForm from "../../features/ResetPasswordForm/ResetPasswordForm";
import { useLocation } from "react-router-dom";

const ResetPassword: React.FC = () => {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<div style={{ display: `flex` }}>
			<LoginSlider />
			<ResetPasswordForm />
		</div>
	);
};

export default ResetPassword;
