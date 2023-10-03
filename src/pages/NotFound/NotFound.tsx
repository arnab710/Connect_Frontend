import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import style from "./NotFound.module.css";

const NotFound = () => {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	return (
		<div className={style.divmain}>
			<h1 className={style.header}>404</h1>
			<p className={style.NotFound}>Not Found :(</p>
			<Link to="/" className={style.Home}>
				← Back to Home
			</Link>
		</div>
	);
};

export default NotFound;
