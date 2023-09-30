import React from "react";
import LoginSlider from "../../features/loginSlider/LoginSlider";
import ResetPasswordForm from "../../features/ResetPasswordForm/ResetPasswordForm";

const ResetPassword: React.FC = () => {
	return (
		<div style={{ display: `flex` }}>
			<LoginSlider />
			<ResetPasswordForm />
		</div>
	);
};

export default ResetPassword;
