import he from "he";
import { AiFillDelete } from "react-icons/ai";
import React, { useState } from "react";
import { eachCommentType } from "../../Types/AfterFetchComment";
import style from "./EachComment.module.css";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";
import useDeleteComment from "../../Hooks/useDeleteComment";
import ModalContent from "../../components/ModalContent/ModalContent";

const EachComment: React.FC<{ eachComment: eachCommentType; setCountComment: React.Dispatch<React.SetStateAction<number>>; postID: string }> = ({ eachComment, setCountComment, postID }) => {
	const userID = useAppSelector((state) => state.user._id);
	const [openModal, setOpenModal] = useState<boolean>(false);

	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
	const decodedText = he.decode(eachComment.comment) as string;

	const { mutate: deleteComment, isLoading } = useDeleteComment(eachComment._id, setCountComment, postID);

	return (
		<div className={style.overallCommentDiv}>
			<div className={style.eachCommentDiv}>
				<div className={style.userPhotoDiv}>
					<img
						src={
							eachComment.user.profilePicture
								? eachComment.user.profilePicture
								: "https://res.cloudinary.com/dmrlrtwbb/image/upload/v1694760858/24-248253_user-profile-default-image-png-clipart-png-download_zurjod.png"
						}
						alt="user's photo"
						className={style.userImg}
					/>
				</div>
				<div className={style.userInfo}>
					<div className={style.headDateDiv}>
						<h1 className={style.headName}>
							{eachComment.user.firstName} {eachComment.user.lastName}
						</h1>
						{userID === eachComment.user._id && (
							<button onClick={() => setOpenModal((c) => !c)} className={style.deleteBtn}>
								<AiFillDelete className={style.deleteIcon} />
							</button>
						)}
					</div>
					<p className={style.userComment}>{decodedText}</p>
				</div>
				{openModal && (
					<ModalContent mutateFxn={deleteComment} isLoading={isLoading} setOpenModal={setOpenModal} header="Delete Confirmation" para="Are You Sure You Want To Delete Your Comment?" button="DELETE" />
				)}
			</div>
		</div>
	);
};

export default EachComment;
