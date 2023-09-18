import "react-loading-skeleton/dist/skeleton.css";
import React from "react";
import style from "./EachCommentSkeleton.module.css";
import Skeleton from "react-loading-skeleton";
const EachCommentSkeleton: React.FC = () => {
	return (
		<div className={style.overallCommentDiv}>
			<div className={style.eachCommentDiv}>
				<Skeleton className={style.userImg} />

				<div className={style.userInfo}>
					<div className={style.headDateDiv}>
						<h1 className={style.headName}>
							<Skeleton />
						</h1>
					</div>
					<p className={style.userComment}>
						<Skeleton />
					</p>
				</div>
			</div>
		</div>
	);
};

export default EachCommentSkeleton;
