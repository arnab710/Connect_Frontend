import { AiFillDelete } from "react-icons/ai";
import React, { useState } from "react";
import style from "./DeleteBtn.module.css";
import useDeletePost from "../../Hooks/useDeletePost";
import ModalContent from "../ModalContent/ModalContent";

const DeleteBtn: React.FC<{ postID: string }> = ({ postID }) => {
	const [isOpenModal, setIsOpenModal] = useState(false);

	const { mutate: deletefn, isLoading } = useDeletePost(postID);

	return (
		<>
			<button className={style.delBtn} onClick={() => setIsOpenModal((c) => !c)}>
				<AiFillDelete className={style.deleteIcon} />
			</button>
			{isOpenModal && <ModalContent mutateFxn={deletefn} isLoading={isLoading} setOpenModal={setIsOpenModal} header="Post Delete" para="Are You Sure You Want to Delete Your Post?" button="Delete" />}
		</>
	);
};

export default DeleteBtn;
