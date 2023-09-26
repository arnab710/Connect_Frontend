import { ImLocation2 } from "react-icons/im";
import { PiSuitcaseFill } from "react-icons/pi";
import React from "react";
import style from "./LeftUserInfo.module.css";

const LeftUserInfo: React.FC<{
	visitedUser: {
		_id: string;
		firstName: string;
		lastName: string;
		occupation: string;
		city: string;
		country: string;
		bio: string;
		profilePicture: string;
		followers: { user: string; _id?: string }[];
	};
}> = ({ visitedUser }) => {
	return (
		<div className={style.backgroundDiv}>
			<div className={style.contentBox}>
				<div className={style.photoUserDetails}>
					<div className={style.userPhotoDiv}>
						<img
							src={
								visitedUser.profilePicture
									? visitedUser.profilePicture
									: "https://res.cloudinary.com/dmrlrtwbb/image/upload/v1694760858/24-248253_user-profile-default-image-png-clipart-png-download_zurjod.png"
							}
							className={style.userPhoto}
							alt="user's photo"
						/>
					</div>
					<div className={style.photoInfo}>
						<h1 className={style.userFullName}>
							<span>{visitedUser.firstName}</span>
							<span>{visitedUser.lastName}</span>
						</h1>
						<p className={style.userFollowersCount}>
							{visitedUser.followers.length} follower{visitedUser.followers.length === 1 || visitedUser.followers.length === 0 ? `` : `s`}
						</p>
					</div>
				</div>
				<div className={style.locationAndJobDiv}>
					<div className={style.locationDiv}>
						<ImLocation2 className={style.userIcon} />
						<span className={style.location}>
							{visitedUser.city}, {visitedUser.country}
						</span>
					</div>
					<div className={style.locationDiv}>
						<PiSuitcaseFill className={style.userIcon} />
						<span className={style.location}>{visitedUser.occupation}</span>
					</div>
				</div>
				<div className={style.bioDiv}>
					<h1 className={style.bioHead}>Your Bio</h1>
					<p className={style.bio}>{visitedUser.bio}</p>
				</div>
			</div>
		</div>
	);
};

export default LeftUserInfo;
