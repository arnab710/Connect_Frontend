import { AiFillDelete } from "react-icons/ai";
import React from "react";
import { eachCommentType } from "../../Types/AfterFetchComment";
import style from "./EachComment.module.css";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";

const EachComment: React.FC<{ eachComment: eachCommentType }> = ({ eachComment }) => {
	const userID = useAppSelector((state) => state.user._id);

	return (
		<div className={style.overallCommentDiv}>
			<div className={style.eachCommentDiv}>
				<div className={style.userPhotoDiv}>
					<img
						src={
							eachComment.user.profilePicture
								? eachComment.user.profilePicture
								: "https://res.cloudinary.com/dmrlrtwbb/image/upload/v1694760858/24-248253_user-profile-default-image-png-clipart-png-download_zurjod.png"
						}
						alt="user's photo"
						className={style.userImg}
					/>
				</div>
				<div className={style.userInfo}>
					<div className={style.headDateDiv}>
						<h1 className={style.headName}>
							{eachComment.user.firstName} {eachComment.user.lastName}
						</h1>
						{userID === eachComment.user._id && <AiFillDelete className={style.deleteIcon} />}
					</div>
					<p className={style.userComment}>{eachComment.comment}</p>
				</div>
			</div>
		</div>
	);
};

export default EachComment;
