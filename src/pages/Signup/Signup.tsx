import React, { useEffect } from "react";
import style from "./Signup.module.css";
import LoginSlider from "../../features/loginSlider/LoginSlider";
import SignupForm from "../../features/signupForm/SignupForm";
import { useLocation } from "react-router-dom";
import UserContextProvider from "../../Contexts/SignUpUserContext";

const Signup: React.FC = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<div className={style.signupDiv}>
			<LoginSlider />
			<UserContextProvider>
				<SignupForm />
			</UserContextProvider>
		</div>
	);
};

export default Signup;
