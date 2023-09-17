import React, { useEffect } from "react";
import Navbar from "../../features/Navbar/Navbar";
import style from "./Home.module.css";
import { useLocation } from "react-router-dom";
import LeftUserInfo from "../../features/LeftSideUserInfo/LeftUserInfo";
import MiddlePostFeed from "../../features/MiddlePostFeed/MiddlePostFeed";
import RightSponsors from "../../features/RightSponsors/RightSponsors";

const Home: React.FC = () => {
	const location = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
	return (
		<div className={style.HomeBackground}>
			<Navbar />
			<section className={style.heroSection}>
				<LeftUserInfo />
				<MiddlePostFeed />
				<RightSponsors />
			</section>
			<div style={{ height: `200vh` }}></div>
		</div>
	);
};

export default Home;
