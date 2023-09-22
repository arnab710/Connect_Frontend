import { HiUserRemove } from "react-icons/hi";
import React from "react";
import style from "./EachFollowingUser.module.css";
import { followingUserType } from "../../Types/AfterFetchUserFollowings";
import useFollowandUnfollow from "../../Hooks/useFollowandUnfollow";

const EachFollowingUser: React.FC<{ eachPeople: { user: followingUserType; _id: string } }> = ({ eachPeople }) => {
	const { mutate: unfollow, isLoading } = useFollowandUnfollow(eachPeople.user._id, eachPeople.user.firstName, "unfollow");

	return (
		<div className={style.eachPeopleBackgroundDiv}>
			<div className={style.imgDiv}>
				<img
					src={
						eachPeople.user.profilePicture
							? eachPeople.user.profilePicture
							: "https://res.cloudinary.com/dmrlrtwbb/image/upload/v1694760858/24-248253_user-profile-default-image-png-clipart-png-download_zurjod.png"
					}
					alt="user's picture"
					className={style.img}
				/>
			</div>
			<div className={style.userInfoDiv}>
				<div>
					<h1 className={style.userInfoName}>
						{eachPeople.user.firstName} {eachPeople.user.lastName}
					</h1>
					<p className={style.userInfoOccupation}>{eachPeople.user.occupation}</p>
				</div>
				<button className={style.unFollowBtn} onClick={() => unfollow()} disabled={isLoading}>
					<HiUserRemove className={style.unfollowIconColour} />
				</button>
			</div>
		</div>
	);
};

export default EachFollowingUser;
