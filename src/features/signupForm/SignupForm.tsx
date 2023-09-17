import React, { useContext } from "react";
import style from "./SignupForm.module.css";
import Icon from "../Icon/Icon";
import Input from "../../components/Input/Input";
import { Link } from "react-router-dom";
import { UserContext } from "../../Contexts/SignUpUserContext";
import { handleChange } from "../../Utils/SignupFormValue";
import useSignup from "../../Hooks/useSignup";
import { IUserType } from "../../Types/signupUserType";
import { initialState } from "../../Utils/SignUpUserInitialState";
import SmallBtnSpinner from "../SmallBtnSpinner/SmallBtnSpinner";

const SignupForm: React.FC = () => {
	const val = useContext(UserContext);
	const { firstName, lastName, email, password, confirmPassword, occupation, bio, country, city }: IUserType = val?.userInfo ? val.userInfo : initialState;

	const { mutate, isLoading } = useSignup();

	const handleSubmit = (): void => {
		mutate({
			firstName,
			lastName,
			email,
			password,
			confirmPassword,
			occupation,
			bio,
			country,
			city,
		});
	};

	return (
		<div className={style.loginFormDiv}>
			<Icon classStyle={style.iconStyle} />
			<p className={style.iconTagLine}>Welcome to Connect, Your Hub for Authentic Connections and Shared Experiences</p>
			<div className={style.inputDiv}>
				<Input inputName="Your First Name" placeholderName="John" inputType="text" iconType="user" valueType="firstName" dispatchType="CHANGE_FIRST_NAME" styleClass={style.firstName} />
				<Input inputName="Your Last Name" placeholderName="Snow" inputType="text" iconType="user" valueType="lastName" dispatchType="CHANGE_LAST_NAME" styleClass={style.inputComponent} />
				<Input inputName="Email Address" placeholderName="john@gmail.com" inputType="email" iconType="email" valueType="email" dispatchType="CHANGE_EMAIL" styleClass={style.inputComponent} />
				<Input inputName="Your Country" placeholderName="United States" inputType="text" iconType="country" valueType="country" dispatchType="CHANGE_COUNTRY" styleClass={style.inputComponent} />
				<Input inputName="Your City" placeholderName="New York" inputType="text" iconType="city" valueType="city" dispatchType="CHANGE_CITY" styleClass={style.inputComponent} />
				<Input
					inputName="Your Profession"
					placeholderName="Software Engineer"
					inputType="text"
					iconType="profession"
					valueType="occupation"
					dispatchType="CHANGE_OCCUPATION"
					styleClass={style.inputComponent}
				/>
				<label htmlFor="userBio" className={style.inputTagName}>
					Your Bio
				</label>
				<textarea
					id="userBio"
					rows={5}
					cols={50}
					maxLength={100}
					placeholder="Hi there! I'm John, you'll find me exploring hiking trails or savoring the latest culinary trends. Passionate about sustainability and always up for a good book recommendation. Let's connect!"
					className={style.bioTextArea}
					value={val?.userInfo.bio}
					onChange={(e) => handleChange(e, val, "CHANGE_BIO", undefined, undefined)}
				/>
				<Input
					inputName="Your Password"
					placeholderName="●●●●●●●●●●●●●"
					inputType="password"
					iconType="password"
					valueType="password"
					dispatchType="CHANGE_PASSWORD"
					styleClass={style.inputComponent}
				/>
				<Input
					inputName="Confirm Password"
					placeholderName="●●●●●●●●●●●●●"
					inputType="password"
					iconType="password"
					valueType="confirmPassword"
					dispatchType="CHANGE_CONFIRM_PASSWORD"
					styleClass={style.inputComponent}
				/>

				<button className={style.signInBtn} onClick={handleSubmit} disabled={isLoading}>
					{isLoading ? (
						<p>
							<SmallBtnSpinner />
						</p>
					) : (
						`SIGN UP`
					)}
				</button>
				<p className={style.noAccPara}>
					Already Have An Account?{" "}
					<Link className={style.SignUpLink} to="/login">
						Log In
					</Link>
				</p>
			</div>
		</div>
	);
};

export default SignupForm;
