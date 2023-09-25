import { FaUserTie } from "react-icons/fa";
import React from "react";
import style from "./MyProfile.module.css";
import Navbar from "../../features/Navbar/Navbar";
import Loader from "../../features/ScreenLoader/Loader";
import useFetchUserInfo from "../../Hooks/useFetchUserInfo";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";
import SingleUserPosts from "../../features/SingleUserPosts/SingleUserPosts";
import LeftUserInfo from "../../features/LeftSideUserInfo/LeftUserInfo";
import RightSponsors from "../../features/RightSponsors/RightSponsors";

const MyProfile: React.FC = () => {
	const userID = useAppSelector((state) => state.user._id);

	const { data, isLoading } = useFetchUserInfo(userID);
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={style.ProfileBackground}>
					<Navbar />
					<div className={style.wholeProfileDiv}>
						<LeftUserInfo />
						<div className={style.mainDiv}>
							<div className={style.coverDiv}>
								<div className={style.coverPhotoDiv}>
									<img className={style.coverPic} src={data?.userData.coverPicture} alt="user's cover photo" />
									<div className={style.profilePhotoDiv}>
										<img className={style.photoPic} src={data?.userData.profilePicture} alt="user's profile picture" />
									</div>
								</div>
								<div className={style.userInfoNameDiv}>
									<div className={style.userNameDiv}>
										<h1 className={style.userName}>
											{data?.userData.firstName} {data?.userData.lastName}
										</h1>
										<p className={style.userLocation}>
											<FaUserTie className={style.locationIcon} />
											<span>{data?.userData.occupation}</span>
										</p>
									</div>
									<div className={style.otherInfoDiv}>
										<div className={style.eachInfoDiv}>
											<span className={style.eachInfoHead}>Posts</span>
											<span className={style.eachInfoval}>{data?.postNumber}</span>
										</div>
										<div className={style.eachInfoDiv}>
											<span className={style.eachInfoHead}>Followers</span>
											<span className={style.eachInfoval}>{data?.userData.followers.length}</span>
										</div>
										<div className={style.eachInfoDiv}>
											<span className={style.eachInfoHead}>Followings</span>
											<span className={style.eachInfoval}>{data?.userData.followings.length}</span>
										</div>
									</div>
								</div>
							</div>
							<SingleUserPosts userID={userID} />
						</div>

						<RightSponsors />
					</div>
				</div>
			)}
		</>
	);
};

export default MyProfile;
