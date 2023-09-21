import { HiUserRemove } from "react-icons/hi";
import React from "react";
import style from "./EachFollowingUser.module.css";
import { followingUserType } from "../../Types/AfterFetchUserFollowings";

const EachFollowingUser: React.FC<{ eachPeople: { user: followingUserType; _id: string } }> = ({ eachPeople }) => {
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
				<HiUserRemove className={style.unfollowIconColour} />
			</div>
		</div>
	);
};

export default EachFollowingUser;
