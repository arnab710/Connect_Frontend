import React from "react";
import style from "./ModalContent.module.css";
import SmallBtnSpinner from "../../features/SmallBtnSpinner/SmallBtnSpinner";
import Modal from "../../features/ModalWindow/Modal";
import { UseMutateFunction } from "@tanstack/react-query";
import { deleteComment } from "../../Types/SuccessfulCommentDelete";

const ModalContent: React.FC<{
	mutateFxn: UseMutateFunction<deleteComment, Error, void, unknown>;
	isLoading: boolean;
	setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
	header: string;
	para: string;
	button: string;
	paraStyle: string;
}> = ({ mutateFxn, isLoading, setOpenModal, header, para, button, paraStyle }) => {
	return (
		<Modal onClose={() => setOpenModal(false)}>
			<>
				<h1 className={style.deleteHeader}>{header}</h1>
				<p className={paraStyle}>{para}</p>
				<div className={style.btnDiv}>
					<button className={style.cancelBtn} onClick={() => setOpenModal((c) => !c)}>
						CANCEL
					</button>
					<button className={style.deleteBtn2} onClick={() => mutateFxn()} disabled={isLoading}>
						{isLoading ? (
							<p>
								<SmallBtnSpinner height={1.2} width={1.2} />
							</p>
						) : (
							`${button}`
						)}
					</button>
				</div>
			</>
		</Modal>
	);
};

export default ModalContent;
