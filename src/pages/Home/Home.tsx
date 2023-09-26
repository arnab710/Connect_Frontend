import React, { useEffect } from "react";
import Navbar from "../../features/Navbar/Navbar";
import style from "./Home.module.css";
import { useLocation } from "react-router-dom";
import LeftUserInfo from "../../features/LeftSideUserInfo/LeftUserInfo";
import MiddlePostFeed from "../../features/MiddlePostFeed/MiddlePostFeed";
import RightSponsors from "../../features/RightSponsors/RightSponsors";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";

const Home: React.FC = () => {
	const location = useLocation();
	const user = useAppSelector((state) => state.user);

	const visitedUser = {
		_id: user._id,
		firstName: user.firstName,
		lastName: user.lastName,
		occupation: user.occupation,
		city: user.city,
		country: user.country,
		bio: user.bio,
		profilePicture: user.profilePicture,
		followers: user.followers,
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);
	return (
		<div className={style.HomeBackground}>
			<Navbar />
			<section className={style.heroSection}>
				<LeftUserInfo visitedUser={visitedUser} />
				<MiddlePostFeed />
				<RightSponsors visitedProfileID={user._id} visitedProfileFirstName={user.firstName} />
			</section>
		</div>
	);
};

export default Home;
