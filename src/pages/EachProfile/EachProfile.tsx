import { FiEdit2 } from "react-icons/fi";
import { FaUserTie } from "react-icons/fa";
import React, { useEffect } from "react";
import style from "./EachProfile.module.css";
import Navbar from "../../features/Navbar/Navbar";
import Loader from "../../features/ScreenLoader/Loader";
import useFetchUserInfo from "../../Hooks/useFetchUserInfo";
import SingleUserPosts from "../../features/SingleUserPosts/SingleUserPosts";
import LeftUserInfo from "../../features/LeftSideUserInfo/LeftUserInfo";
import RightSponsors from "../../features/RightSponsors/RightSponsors";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { userInfoFetch } from "../../Types/userInfoFetchType";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";

const EachProfile: React.FC = () => {
	const visitedProfileID = useParams().userID as string;
	const myID = useAppSelector((state) => state.user._id);
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [location.pathname]);

	const { data, isLoading } = useFetchUserInfo(visitedProfileID) as { data: userInfoFetch; isLoading: boolean };

	const visitedUser = {
		_id: data?.userData._id,
		firstName: data?.userData.firstName,
		lastName: data?.userData.lastName,
		occupation: data?.userData.occupation,
		city: data?.userData.city,
		country: data?.userData.country,
		bio: data?.userData.bio,
		profilePicture: data?.userData.profilePicture,
		followers: data?.userData.followers,
	};
	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div className={style.ProfileBackground}>
					<Navbar />
					<div className={style.wholeProfileDiv}>
						<LeftUserInfo visitedUser={visitedUser} />
						<div className={style.mainDiv}>
							<div className={style.coverDiv}>
								<div className={`${style.coverPhotoDiv} ${!data.userData.coverPicture && style.noCoverImage}`}>
									{data.userData.coverPicture && <img className={style.coverPic} src={data?.userData.coverPicture} alt="user's cover photo" />}
									<div className={style.profilePhotoDiv}>
										<img
											className={style.photoPic}
											src={
												data?.userData.profilePicture
													? data.userData.profilePicture
													: "https://res.cloudinary.com/dmrlrtwbb/image/upload/v1694760858/24-248253_user-profile-default-image-png-clipart-png-download_zurjod.png"
											}
											alt="user's profile picture"
										/>
									</div>
									{visitedProfileID === myID && (
										<div className={style.coverPhotoEditDiv} onClick={() => navigate("/profileSetting")}>
											<FiEdit2 />
										</div>
									)}
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
							<SingleUserPosts userID={visitedProfileID} />
						</div>

						<RightSponsors visitedProfileID={data.userData._id} visitedProfileFirstName={data.userData.firstName} />
					</div>
				</div>
			)}
		</>
	);
};

export default EachProfile;
