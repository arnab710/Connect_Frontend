import React, { useState } from "react";
import style from "./CommentInput.module.css";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";
import usePostComment from "../../Hooks/usePostComment";
import SmallBtnSpinner from "../SmallBtnSpinner/SmallBtnSpinner";

const CommentInput: React.FC<{ postID: string; setCountComment: React.Dispatch<React.SetStateAction<number>>; userID: string }> = ({ postID, setCountComment, userID }) => {
	const [input, setInput] = useState<string>("");
	const userPicture: string = useAppSelector((state) => state.user.profilePicture);

	const { mutate: Comment, isLoading } = usePostComment(postID, input, setCountComment, setInput, userID);

	const handlePost = () => {
		Comment();
	};

	return (
		<>
			<section className={style.inputCommentSection}>
				<div className={style.userPictureDiv}>
					<img
						src={userPicture ? userPicture : `https://res.cloudinary.com/dmrlrtwbb/image/upload/v1694760858/24-248253_user-profile-default-image-png-clipart-png-download_zurjod.png`}
						className={style.userImg}
						alt="user's picture"
					/>
				</div>
				<div className={style.commentInputAndPostDiv}>
					<div className={style.commentInputDiv}>
						<input type="text" onChange={(e) => setInput(e.target.value)} value={input} className={style.commentInput} placeholder="Write a Comment...." />
					</div>
				</div>
			</section>
			{input && (
				<div className={style.btnDiv}>
					<button className={style.PostBtn} onClick={handlePost} disabled={isLoading}>
						{isLoading ? (
							<p>
								<SmallBtnSpinner width={1.1} height={1.1} />
							</p>
						) : (
							`POST`
						)}
					</button>
				</div>
			)}
		</>
	);
};

export default CommentInput;
