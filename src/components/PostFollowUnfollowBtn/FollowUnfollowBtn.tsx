import React, { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { HiUserRemove } from "react-icons/hi";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";
import style from "./FollowUnfollowBtn.module.css";
import useFollowandUnfollow from "../../Hooks/useFollowandUnfollow";
import ModalContent from "../ModalContent/ModalContent";

const FollowUnfollowBtn: React.FC<{ postUser: string; postUserName: string }> = ({ postUser, postUserName }) => {
	const userDetails = useAppSelector((state) => state.user);
	const isFollowedByUser = userDetails.followings.some((val) => val.user === postUser);

	const [isUnfollowPopUp, setIsUnfollowPopUp] = useState(false);

	const { mutate: follow, isLoading: isFollowLoading } = useFollowandUnfollow(postUser, postUserName, "follow", userDetails._id);
	const { mutate: unfollow, isLoading: isUnfollowLoading } = useFollowandUnfollow(postUser, postUserName, "unfollow", userDetails._id, setIsUnfollowPopUp);

	return (
		<>
			{isFollowedByUser ? (
				<button className={style.unfollowBtn} onClick={() => setIsUnfollowPopUp((c) => !c)} disabled={isUnfollowLoading}>
					<HiUserRemove className={style.unfollowIconColour} />
				</button>
			) : (
				<button className={style.followBtn} onClick={() => follow()} disabled={isFollowLoading}>
					<AiOutlineUserAdd className={style.followIcon} />
				</button>
			)}
			{isUnfollowPopUp && (
				<ModalContent
					mutateFxn={unfollow}
					isLoading={isUnfollowLoading}
					setOpenModal={setIsUnfollowPopUp}
					header="Unfollow Confirmation"
					para={`Are You Sure You Want to Unfollow ${postUserName}?`}
					button="Unfollow"
				/>
			)}
		</>
	);
};

export default FollowUnfollowBtn;
