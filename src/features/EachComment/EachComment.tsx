import { AiFillDelete } from "react-icons/ai";
import React, { useState } from "react";
import { eachCommentType } from "../../Types/AfterFetchComment";
import style from "./EachComment.module.css";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";
import Modal from "../ModalWindow/Modal";

const EachComment: React.FC<{ eachComment: eachCommentType }> = ({ eachComment }) => {
	const userID = useAppSelector((state) => state.user._id);
	const [openModal, setOpenModal] = useState<boolean>(false);

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
					<p className={style.userComment}>{eachComment.comment}</p>
				</div>
				{openModal && (
					<Modal onClose={() => setOpenModal(false)}>
						<div className={style.modalContent}>
							<h1 className={style.deleteHeader}>Delete Confirmation</h1>
							<p className={style.deletPara}>Are You Sure You Want To Delete Your Comment ?</p>
							<div className={style.btnDiv}>
								<button className={style.cancelBtn}>CANCEL</button>
								<button className={style.deleteBtn2}>DELETE</button>
							</div>
						</div>
					</Modal>
				)}
			</div>
		</div>
	);
};

export default EachComment;
