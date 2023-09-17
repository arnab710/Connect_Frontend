import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { GrMapLocation } from "react-icons/gr";
import { BiUser } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { FaUserGraduate } from "react-icons/fa";
import React, { useContext } from "react";
import style from "./Input.module.css";
import { iconType, propType } from "../../Types/inputComponentType";
import { UserContext } from "../../Contexts/SignUpUserContext";
import { handleChange } from "../../Utils/SignupFormValue";

const iconClass: iconType = {
	email: <AiOutlineMail className={style.emailIcon} />,
	password: <RiLockPasswordLine className={style.emailIcon} />,
	user: <BiUser className={style.emailIcon} />,
	country: <GrMapLocation className={style.emailIcon} />,
	city: <IoLocationOutline className={style.emailIcon} />,
	profession: <FaUserGraduate className={style.emailIcon} />,
};

const Input: React.FC<propType> = ({ inputName, placeholderName, inputType, iconType, valueType, dispatchType, styleClass, stateValue, dispatchfxn, isLoginInput }) => {
	const val = useContext(UserContext);

	const handleCurrValue = () => {
		if (valueType) return val?.userInfo[valueType];
		else if (isLoginInput) return stateValue;
	};

	return (
		<div className={`${style.inputDiv} ${styleClass ? styleClass : ""}`}>
			<h1 className={style.inputTagName}>{inputName}</h1>
			<div className={style.inputAreaDiv}>
				{iconClass[iconType as keyof iconType]}
				<input className={style.inputArea} type={inputType} placeholder={placeholderName} value={handleCurrValue()} onChange={(e) => handleChange(e, val, dispatchType, dispatchfxn, isLoginInput)} />
			</div>
		</div>
	);
};

export default Input;
