import React from "react";
import style from "./Icon.module.css";

const Icon: React.FC<{ classStyle?: string }> = ({ classStyle }) => {
	return (
		<div className={`${classStyle} ${style.iconDiv}`}>
			<img className={style.iconImg} src="/AppLogo.png" alt="logo" />
			<header>
				C<span className={style.oSpan}>o</span>nnect
			</header>
		</div>
	);
};

export default Icon;
