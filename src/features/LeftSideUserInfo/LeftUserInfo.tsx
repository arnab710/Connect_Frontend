import { ImLocation2 } from "react-icons/im";
import { PiSuitcaseFill } from "react-icons/pi";
import React from "react";
import style from "./LeftUserInfo.module.css";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";

const LeftUserInfo: React.FC = () => {
	const user = useAppSelector((state) => state.user);

	return (
		<div className={style.backgroundDiv}>
			<div className={style.contentBox}>
				<div className={style.photoUserDetails}>
					<div className={style.userPhotoDiv}>
						<img
							src={user.profilePicture ? user.profilePicture : "https://res.cloudinary.com/dmrlrtwbb/image/upload/v1694760858/24-248253_user-profile-default-image-png-clipart-png-download_zurjod.png"}
							className={style.userPhoto}
							alt="user's photo"
						/>
					</div>
					<div className={style.photoInfo}>
						<h1 className={style.userFullName}>
							<span>{user.firstName}</span>
							<span>{user.lastName}</span>
						</h1>
						<p className={style.userFollowersCount}>
							{user.followers.length} follower{user.followers.length === 1 || user.followers.length === 0 ? `` : `s`}
						</p>
					</div>
				</div>
				<div className={style.locationAndJobDiv}>
					<div className={style.locationDiv}>
						<ImLocation2 className={style.userIcon} />
						<span className={style.location}>
							{user.city}, {user.country}
						</span>
					</div>
					<div className={style.locationDiv}>
						<PiSuitcaseFill className={style.userIcon} />
						<span className={style.location}>{user.occupation}</span>
					</div>
				</div>
				<div className={style.bioDiv}>
					<h1 className={style.bioHead}>Your Bio</h1>
					<p className={style.bio}>{user.bio}</p>
				</div>
			</div>
		</div>
	);
};

export default LeftUserInfo;
