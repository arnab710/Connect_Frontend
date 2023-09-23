import { BiImage, BiVideoPlus } from "react-icons/bi";
import { AiOutlineAudio } from "react-icons/ai";
import React, { useState } from "react";
import style from "./NewPostInput.module.css";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";
import useUploadContent from "../../Hooks/useUploadContent";

const NewPostInput: React.FC = () => {
	const [inputType, setInputType] = useState<"image" | "audio" | "video" | null>(null);
	const [fileInfo, setFileInfo] = useState<File | null>(null);
	const User = useAppSelector((state) => state.user);
	const [inputDescription, setInputDescription] = useState<string>("");

	const { mutate: post, isLoading } = useUploadContent(inputDescription, setFileInfo, setInputType);

	const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return setFileInfo(null);
		return setFileInfo(e.target.files[0]);
	};

	console.log(isLoading);
	const handlePost = () => {
		if (!fileInfo || !inputType) return null;
		post({ fileInfo, inputType });
	};

	return (
		<section className={style.userDescriptionDiv}>
			<div className={style.userDescriptionWholeDiv}>
				<div className={style.userPictureDiv}>
					<img
						src={User.profilePicture ? User.profilePicture : "https://res.cloudinary.com/dmrlrtwbb/image/upload/v1694760858/24-248253_user-profile-default-image-png-clipart-png-download_zurjod.png"}
						alt="user's picture"
						className={style.userImg}
					/>
				</div>
				<div className={style.descriptionInputDiv}>
					<input placeholder="What's on your mind...." value={inputDescription} onChange={(e) => setInputDescription(e.target.value)} className={style.descriptionInput} />
				</div>
			</div>
			{inputType && <input type="file" accept={`${inputType}/*`} onChange={handleUploadChange} />}
			<div className={style.variousInputDiv}>
				<button className={style.inputBtn} onClick={() => setInputType("image")}>
					<BiImage className={style.icon} />
					<span className={style.iconText}>Image</span>
				</button>
				<button className={style.inputBtn} onClick={() => setInputType("video")}>
					<BiVideoPlus className={style.icon} />
					<span className={style.iconText}>Clip</span>
				</button>
				<button className={style.inputBtn} onClick={() => setInputType("audio")}>
					<AiOutlineAudio className={style.icon} />
					<span className={style.iconText}>Audio</span>
				</button>
				<button className={style.postBtn} onClick={handlePost}>
					POST
				</button>
			</div>
		</section>
	);
};

export default NewPostInput;
