import React, { useEffect, useState } from "react";
import style from "./LoginSlider.module.css";
import { imageInfo } from "./LoginSliderImageInfo";
const LoginSlider: React.FC = () => {
	const [currentPictureIndex, setCurrentPictureIndex] = useState<number>(0);
	useEffect(() => {
		const intervalID = setInterval(() => {
			setCurrentPictureIndex((curr) => (curr + 1) % imageInfo.length);
		}, 5000);
		return () => clearInterval(intervalID);
	}, []);

	return (
		<div className={style.loginSliderDiv}>
			<div className={style.imageWrapper} style={{ transform: `translateX(-${currentPictureIndex * 50}vw)` }}>
				{imageInfo.map((eachImage, ind) => (
					<div className={style.sliderImageContainer} key={ind}>
						<img className={style.sliderImage} src={eachImage.image_URL} alt="login image" />
						<h1 className={style.sliderHeadLine}>{eachImage.image_Head}</h1>
						<div className={style.sliderParaDiv}>
							<p className={style.sliderPara}>{eachImage.image_para}</p>
						</div>
					</div>
				))}
			</div>
			<div className={style.bulletDiv}>
				<span className={`${style.bulletSpan} ${currentPictureIndex === 0 ? style.activatedBullet : ""}`} onClick={() => setCurrentPictureIndex(0)}></span>
				<span className={`${style.bulletSpan} ${currentPictureIndex === 1 ? style.activatedBullet : ""}`} onClick={() => setCurrentPictureIndex(1)}></span>
				<span className={`${style.bulletSpan} ${currentPictureIndex === 2 ? style.activatedBullet : ""}`} onClick={() => setCurrentPictureIndex(2)}></span>
			</div>
		</div>
	);
};

export default LoginSlider;
