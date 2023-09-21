import React, { useEffect, useState } from "react";
import style from "./RightSponsors.module.css";
import { sponsorsSlider } from "./RightSponsorSlider";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";
import useFetchFollowings from "../../Hooks/useFetchFollowings";
import EachFollowingUser from "../EachFollowingUser/EachFollowingUser";
import toast from "react-hot-toast";
import { styleObj } from "../../components/notifications/errorStyle";

const RightSponsors: React.FC = () => {
	const [currentPictureIndex, setCurrentPictureIndex] = useState<number>(0);

	const userID = useAppSelector((state) => state.user._id);

	const { data: followingsArray, isLoading, isError: isFollowingArrayError } = useFetchFollowings(userID);

	useEffect(() => {
		const intervalID = setInterval(() => {
			setCurrentPictureIndex((curr) => (curr + 1) % sponsorsSlider.length);
		}, 3000);
		return () => clearInterval(intervalID);
	}, []);

	useEffect(() => {
		if (isFollowingArrayError)
			toast.error("Somethig Went wrong while getting your following details", {
				style: styleObj,
			});
	});

	console.log(isLoading);
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
			<div className={style.followingListDiv}>
				<h1 className={style.followHead}>The People You Follow</h1>
				<div className={style.followingDiv}>
					{followingsArray?.followers.map((eachPeople, _id) => (
						<EachFollowingUser key={_id} eachPeople={eachPeople} />
					))}
				</div>
			</div>
		</div>
	);
};

export default RightSponsors;
