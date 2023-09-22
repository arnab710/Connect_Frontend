import React from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { HiUserRemove } from "react-icons/hi";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";
import style from "./FollowUnfollowBtn.module.css";
import useFollowandUnfollow from "../../Hooks/useFollowandUnfollow";

const FollowUnfollowBtn: React.FC<{ postUser: string; postUserName: string }> = ({ postUser, postUserName }) => {
	const userDetails = useAppSelector((state) => state.user);

	const isFollowedByUser = userDetails.followings.some((val) => val.user === postUser);

	const { mutate: follow, isLoading: isFollowLoading } = useFollowandUnfollow(postUser, postUserName, "follow");
	const { mutate: unfollow, isLoading: isUnfollowLoading } = useFollowandUnfollow(postUser, postUserName, "unfollow");

	return (
		<>
			{isFollowedByUser ? (
				<button className={style.unfollowBtn} onClick={() => unfollow()} disabled={isUnfollowLoading}>
					<HiUserRemove className={style.unfollowIconColour} />
				</button>
			) : (
				<button className={style.followBtn} onClick={() => follow()} disabled={isFollowLoading}>
					<AiOutlineUserAdd className={style.followIcon} />
				</button>
			)}
		</>
	);
};

export default FollowUnfollowBtn;
