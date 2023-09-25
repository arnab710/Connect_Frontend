import React from "react";
import style from "./Icon.module.css";
import { useNavigate } from "react-router-dom";

const Icon: React.FC<{ classStyle?: string }> = ({ classStyle }) => {
	const Navigate = useNavigate();

	return (
		<div className={`${classStyle} ${style.iconDiv}`} onClick={() => Navigate("/")}>
			<img className={style.iconImg} src="/AppLogo.png" alt="logo" />
			<header>
				C<span className={style.oSpan}>o</span>nnect
			</header>
		</div>
	);
};

export default Icon;
