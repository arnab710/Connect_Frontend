import { BiImage, BiVideoPlus } from "react-icons/bi";
import { AiOutlineAudio, AiOutlineWarning } from "react-icons/ai";
import React, { useState } from "react";
import style from "./NewPostInput.module.css";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";
import useUploadContent from "../../Hooks/useUploadContent";
import toast from "react-hot-toast";
import { styleObj } from "../../components/notifications/errorStyle";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import SmallBtnSpinner from "../SmallBtnSpinner/SmallBtnSpinner";

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.1rem;
	border-radius: 5px;
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1px;
	right: 1rem;
	cursor: pointer;

	&:hover {
		background-color: #f3f4f6;
	}

	& svg {
		width: 1.3rem;
		height: 1.3rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: #6b7280;
	}
`;

const NewPostInput: React.FC = () => {
	const [fileInfo, setFileInfo] = useState<File | null>(null);
	const [inputDescription, setInputDescription] = useState<string>("");
	const User = useAppSelector((state) => state.user);

	const { mutate: post, isLoading } = useUploadContent(inputDescription, setFileInfo, setInputDescription);

	const handleUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return setFileInfo(null);
		setFileInfo(e.target.files[0]);

		e.target.value = "";
	};

	const handlePost = () => {
		if (!fileInfo)
			toast.error("No File Selected", {
				style: styleObj,
			});
		if (!fileInfo) return null;
		post({ fileInfo });
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
			{fileInfo && (
				<div className={style.fileInputDiv}>
					{isLoading ? (
						<div className={style.warningDiv}>
							<AiOutlineWarning className={style.warningIcon} />
							<p className={style.uploadWarning}>
								Upload times may be longer than usual as this platform is primarily designed for portfolio showcase purposes and operates within limited storage resources 😥.Thank you for your
								understanding and patience.
							</p>
						</div>
					) : (
						<>
							<p>{fileInfo.name}</p>
							<Button onClick={() => setFileInfo(null)}>
								<HiXMark />
							</Button>
						</>
					)}
				</div>
			)}
			<div className={style.variousInputDiv}>
				<div className={style.inputFileWhole}>
					<input type="file" accept="image/*" id="image-upload" onChange={handleUploadChange} className={style.hiddenInput} />
					<label htmlFor="image-upload">
						<span className={style.inputSpan}>
							<BiImage className={style.icon} />
							<span className={style.iconText}>Image</span>
						</span>
					</label>
				</div>
				<div className={style.inputFileWhole}>
					<input type="file" accept="video/mp4" id="video-upload" className={style.hiddenInput} onChange={handleUploadChange} />
					<label htmlFor="video-upload">
						<span className={style.inputSpan}>
							<BiVideoPlus className={style.icon} />
							<span className={style.iconText}>Clip</span>
						</span>
					</label>
				</div>
				<div className={style.inputFileWhole}>
					<input type="file" accept="audio/mp3" id="audio-upload" className={style.hiddenInput} onChange={handleUploadChange} />
					<label htmlFor="audio-upload">
						<span className={style.inputSpan}>
							<AiOutlineAudio className={style.icon} />
							<span className={style.iconText}>Audio</span>
						</span>
					</label>
				</div>
				<button className={style.postBtn} onClick={handlePost} disabled={isLoading}>
					{isLoading ? (
						<p className={style.spinnerPara}>
							<SmallBtnSpinner height={1} width={1} />
						</p>
					) : (
						`POST`
					)}
				</button>
			</div>
		</section>
	);
};

export default NewPostInput;
