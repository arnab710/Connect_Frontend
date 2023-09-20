import React, { useEffect, useState } from "react";
import style from "./RightSponsors.module.css";
import { sponsorsSlider } from "./RightSponsorSlider";

const RightSponsors: React.FC = () => {
	const [currentPictureIndex, setCurrentPictureIndex] = useState<number>(0);

	useEffect(() => {
		const intervalID = setInterval(() => {
			setCurrentPictureIndex((curr) => (curr + 1) % sponsorsSlider.length);
		}, 3000);
		return () => clearInterval(intervalID);
	}, []);
	return (
		<div className={style.backgroundDiv}>
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
	);
};

export default RightSponsors;
