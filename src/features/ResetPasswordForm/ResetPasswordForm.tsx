import React, { useState } from "react";
import SmallBtnSpinner from "../SmallBtnSpinner/SmallBtnSpinner";
import { RiLockPasswordLine } from "react-icons/ri";
import Icon from "../Icon/Icon";
import { Link, useParams } from "react-router-dom";
import style from "./ResetPasswordForm.module.css";
import useResetPassword from "../../Hooks/useResetPassword";

const ResetPasswordForm: React.FC = () => {
	const [passwordObj, setPasswordObj] = useState<{ newPassword: string; confirmNewPassword: string }>({ newPassword: "", confirmNewPassword: "" });

	const resetToken = useParams().resetToken as string;

	const { mutate, isLoading, isSuccess } = useResetPassword(resetToken);

	return (
		<div className={style.BackgroundLayoutDiv}>
			<Icon classStyle={style.iconStyle} />
			<p className={style.iconTagLine}>Welcome to Connect, Your Hub for Authentic Connections and Shared Experiences</p>
			<div className={style.inputEmailDiv}>
				<label htmlFor="new-password-input" className={style.emailLabel}>
					Enter New Password
				</label>
				<div className={style.inputDiv}>
					<RiLockPasswordLine className={style.emailIcon} />
					<input
						type="password"
						id="new-password-input"
						placeholder="●●●●●●●●●●●●●"
						className={style.inputEmail}
						value={passwordObj.newPassword}
						onChange={(e) => setPasswordObj((currObj) => ({ ...currObj, newPassword: e.target.value }))}
					/>
				</div>
				<label htmlFor="confirm-input" className={style.emailLabel}>
					Confirm New Password
				</label>
				<div className={style.inputDiv}>
					<RiLockPasswordLine className={style.emailIcon} />
					<input
						type="password"
						id="confirm-input"
						placeholder="●●●●●●●●●●●●●"
						className={style.inputEmail}
						value={passwordObj.confirmNewPassword}
						onChange={(e) => setPasswordObj((currObj) => ({ ...currObj, confirmNewPassword: e.target.value }))}
					/>
				</div>
				<button className={style.submitBtn} disabled={isLoading} onClick={() => mutate({ newPassword: passwordObj.newPassword, confirmNewPassword: passwordObj.confirmNewPassword })}>
					{isLoading ? (
						<p>
							<SmallBtnSpinner height={1.15} width={1.15} />
						</p>
					) : (
						`CHANGE PASSWORD`
					)}
				</button>
				<p className={style.noAccPara}>
					Know Your Password ?{" "}
					<Link className={style.SignUpLink} to="/login">
						Log In
					</Link>
				</p>
				{isSuccess && <p className={style.mailPara}>Click the Above Link and Login Again with Your New Password !!</p>}
			</div>
		</div>
	);
};

export default ResetPasswordForm;
