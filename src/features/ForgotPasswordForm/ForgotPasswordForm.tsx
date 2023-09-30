import { AiOutlineMail } from "react-icons/ai";
import React, { useState } from "react";
import Icon from "../Icon/Icon";
import style from "./ForgotPasswordForm.module.css";
import { Link } from "react-router-dom";
import useForgotPassword from "../../Hooks/useForgotPassword";
import SmallBtnSpinner from "../SmallBtnSpinner/SmallBtnSpinner";

const ForgotPasswordForm: React.FC = () => {
	const [email, setEmail] = useState<string>("");

	const { mutate, isLoading, isSuccess } = useForgotPassword();

	return (
		<div className={style.BackgroundLayoutDiv}>
			<Icon classStyle={style.iconStyle} />
			<p className={style.iconTagLine}>Welcome to Connect, Your Hub for Authentic Connections and Shared Experiences</p>
			<div className={style.inputEmailDiv}>
				<label htmlFor="email-input" className={style.emailLabel}>
					Enter Email Address
				</label>
				<div className={style.inputDiv}>
					<AiOutlineMail className={style.emailIcon} />
					<input type="email" id="email-input" placeholder="john@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className={style.inputEmail} />
				</div>
				<button className={style.submitBtn} disabled={isLoading} onClick={() => mutate({ email })}>
					{isLoading ? (
						<p>
							<SmallBtnSpinner height={1.15} width={1.15} />
						</p>
					) : (
						`SEND RESET LINK`
					)}
				</button>
				<p className={style.noAccPara}>
					Know Your Password ?{" "}
					<Link className={style.SignUpLink} to="/login">
						Log In
					</Link>
				</p>
				{isSuccess && <p className={style.mailPara}>Please Check Your Inbox and Spam folder and click the link provided to reset your password (valid for 5 mins)</p>}
			</div>
		</div>
	);
};

export default ForgotPasswordForm;
