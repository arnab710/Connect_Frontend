import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import style from "./EachPostSkeleton.module.css";

const EachPostSkeleton: React.FC = () => {
	return (
		<div className={style.backgroundDiv}>
			<div className={style.postProfileInfo}>
				<Skeleton className={style.postUserPictureSkeleton} />

				<div className={style.userInfoDiv}>
					<div>
						<p className={style.userName}>
							<Skeleton />
						</p>
						<p className={style.userLocation}>
							<Skeleton />
						</p>
					</div>
				</div>
			</div>
			<section className={style.description}>
				<Skeleton count={4} />
			</section>
			<section className={style.imagePostDiv}>
				<Skeleton className={style.imagePostSkeleton} />
			</section>
		</div>
	);
};

export default EachPostSkeleton;
