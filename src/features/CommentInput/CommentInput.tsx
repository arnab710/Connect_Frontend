import React, { useState } from "react";
import style from "./CommentInput.module.css";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";

const CommentInput: React.FC = () => {
	const [input, setInput] = useState<string>("");
	const userPicture: string = useAppSelector((state) => state.user.profilePicture);

	return (
		<>
			<section className={style.inputCommentSection}>
				<div className={style.userPictureDiv}>
					<img src={userPicture} className={style.userImg} alt="user's picture" />
				</div>
				<div className={style.commentInputAndPostDiv}>
					<div className={style.commentInputDiv}>
						<input type="text" onChange={(e) => setInput(e.target.value)} value={input} className={style.commentInput} placeholder="Write a Comment...." />
					</div>
				</div>
			</section>
			{input && (
				<div className={style.btnDiv}>
					<button className={style.PostBtn}>Post</button>
				</div>
			)}
		</>
	);
};

export default CommentInput;
