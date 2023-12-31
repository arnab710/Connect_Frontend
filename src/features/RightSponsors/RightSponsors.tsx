import React, { useEffect, useState } from "react";
import style from "./RightSponsors.module.css";
import { sponsorsSlider } from "./RightSponsorSlider";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";
import useFetchFollowings from "../../Hooks/useFetchFollowings";
import EachFollowingUser from "../EachFollowingUser/EachFollowingUser";
import SmallBtnSpinner from "../SmallBtnSpinner/SmallBtnSpinner";

const RightSponsors: React.FC<{ visitedProfileID: string; visitedProfileFirstName: string }> = ({ visitedProfileID, visitedProfileFirstName }) => {
	const [currentPictureIndex, setCurrentPictureIndex] = useState<number>(0);

	const [followingsFetchEnabler, setFollowingFetchEnabler] = useState(false);
	const user = useAppSelector((state) => state.user);

	const { data: followingsArray, isLoading } = useFetchFollowings(visitedProfileID, followingsFetchEnabler);

	useEffect(() => {
		const intervalID = setInterval(() => {
			setCurrentPictureIndex((curr) => (curr + 1) % sponsorsSlider.length);
		}, 3000);
		return () => clearInterval(intervalID);
	}, []);

	useEffect(() => {
		if (user._id) setFollowingFetchEnabler(true);
	}, [user._id, setFollowingFetchEnabler]);

	return (
		<div className={style.backgroundDiv}>
			<div className={style.sponsorsDiv}>
				<div className={style.headDiv}>
					<span className={style.SponsorHead}>Sponsored</span>
					<span className={style.createAdHead}>Create Ad</span>
				</div>
				<div className={style.imgDiv}>
					<div className={style.imgOverlay} style={{ transform: `translateX(-${currentPictureIndex * 100}%)` }}>
						{sponsorsSlider.map((eachVal, index) => (
							<img src={eachVal} className={style.img} alt="advertisement" key={index} />
						))}
					</div>
				</div>
				<div className={style.companyNameDiv}>
					<span className={style.companyName}>SweetCrafts</span>
					<span className={style.companyWebsite}>www.SweetCrafts.com</span>
				</div>
				<p className={style.description}>SweetCrafts: Crafting artisanal desserts. Our bakers use the finest ingredients. Every treat is a work of art. Indulge in sweet perfection.</p>
			</div>
			<div className={`${(followingsArray && followingsArray.followings.length < 2) || isLoading ? style.followingDivHeight : style.followingListDiv}`}>
				{<h1 className={style.followHead}>{visitedProfileID === user._id ? `The People You Follow` : `The People ${visitedProfileFirstName} Follows`}</h1>}
				<div className={style.followingDiv}>
					{isLoading ? (
						<p className={style.spinnerPara}>
							<SmallBtnSpinner height={2} width={2} />
						</p>
					) : (
						followingsArray?.followings.map((eachPeople) => <EachFollowingUser key={eachPeople._id} eachPeople={eachPeople} />)
					)}
				</div>
			</div>
		</div>
	);
};

export default RightSponsors;
