import React, { useEffect } from "react";
import "./loader.css";
import { useLocation } from "react-router-dom";
const Loader: React.FC = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
	return (
		<div className="loader-div-backend">
			<div className="sk-folding-cube">
				<div className="sk-cube1 sk-cube"></div>
				<div className="sk-cube2 sk-cube"></div>
				<div className="sk-cube4 sk-cube"></div>
				<div className="sk-cube3 sk-cube"></div>
			</div>
		</div>
	);
};

export default Loader;
