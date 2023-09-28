import { FiEdit2 } from "react-icons/fi";
import React, { useReducer, useState } from "react";
import style from "./ProfileSetting.module.css";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";
import Navbar from "../../features/Navbar/Navbar";
import EditProfileInputTag from "../../components/EditProfileInputTag/EditProfileInputTag";
import { editUserInfoInitialState } from "../../Types/editUserInfoInitialState";
import { userInfoReducer } from "../../Reducers/userInfoReducer";
import ChangePictureModal from "../../features/ChangePictureModal/ChangePictureModal";

const ProfileSetting: React.FC = () => {
	const [openModalWindow, setIsOpenModalWindow] = useState(false);
	const [image, setImage] = useState<string | null>(null);
	const user = useAppSelector((state) => state.user);

	const initialState: editUserInfoInitialState = {
		firstName: user.firstName,
		lastName: user.lastName,
		profilePicture: user.profilePicture,
		coverPhoto: user.coverPicture,
		city: user.city,
		country: user.country,
		bio: user.bio,
	};

	const [userInfo, dispatch] = useReducer(userInfoReducer, initialState);

	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const reader = new FileReader();
		reader.onload = () => {
			if (reader.result && typeof reader.result === "string") {
				setImage(reader.result);
				setIsOpenModalWindow((window) => !window);
			}
		};
		reader.readAsDataURL(e.target.files[0]);
		e.target.value = "";
	};

	return (
		<div className={style.backgroundDiv}>
			<Navbar />
			<main className={style.mainDiv}>
				<div className={style.backgroundImgDiv}>
					<img src={user.coverPicture} alt="user's cover photo" className={style.coverImg} />

					<label htmlFor="image-upload" className={style.inputLabel}>
						<FiEdit2 className={style.cameraIcon1} />
					</label>
					<input type="file" accept="image/*" id="image-upload" className={style.hiddenInput} onChange={onFileChange} />
				</div>
				<div className={style.mainEditSectionDiv}>
					<div className={style.imgDiv}>
						<img src={user.profilePicture} alt="user's profile picture" className={style.profilePicture} />
						<label htmlFor="image-upload" className={style.inputLabel2}>
							<FiEdit2 className={style.cameraIcon1} />
						</label>
					</div>
					<div className={style.infoDiv}>
						<h1 className={style.editProfileHead}>Edit Profile</h1>
						<EditProfileInputTag inputHead="Your First Name" value={userInfo.firstName} dispatchFxn={dispatch} dispatchFxnName="firstName" key={1} />
						<EditProfileInputTag inputHead="Your Last Name" value={userInfo.lastName} dispatchFxn={dispatch} dispatchFxnName="lastName" key={2} />
						<EditProfileInputTag inputHead="Your City" value={userInfo.city} dispatchFxn={dispatch} dispatchFxnName="city" key={3} />
						<EditProfileInputTag inputHead="Your Country" value={userInfo.country} dispatchFxn={dispatch} dispatchFxnName="country" key={4} />
						<div className={style.bioAreaDiv}>
							<label htmlFor="Bio" className={style.bioLabel}>
								Your Bio
							</label>
							<textarea id="Bio" rows={4} className={style.textArea} value={userInfo.bio} onChange={(e) => dispatch({ type: "bio", payload: e.target.value })} />
						</div>
						<div className={style.btnDiv}>
							<button className={style.buttonBack}>Back</button>
							<button className={style.buttonUpdate}>Update</button>
						</div>
					</div>
				</div>
			</main>
			{openModalWindow && image && <ChangePictureModal setOpenModal={setIsOpenModalWindow} image={image} />}
		</div>
	);
};

export default ProfileSetting;
