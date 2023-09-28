import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import React, { useRef } from "react";
import Modal from "../ModalWindow/Modal";
import style from "./ChangePictureModal.module.css";
import useUpdatePhoto from "../../Hooks/useUpdatePhoto";
import SmallBtnSpinner from "../SmallBtnSpinner/SmallBtnSpinner";

const ChangePictureModal: React.FC<{ setOpenModal: React.Dispatch<React.SetStateAction<boolean>>; image: string }> = ({ setOpenModal, image }) => {
	const cropperRef = useRef<ReactCropperElement | null>(null);
	const { mutate, isLoading } = useUpdatePhoto(setOpenModal);

	const getCropData = () => {
		const imageElement = cropperRef?.current;
		const cropper = imageElement?.cropper;

		if (cropper) {
			const canvas: HTMLCanvasElement = cropper.getCroppedCanvas();
			const dataURL = canvas.toDataURL();

			const URLToFile = async () => {
				const response = await fetch(dataURL);
				const blob = await response.blob();
				const file = new File([blob], "fileName.jpg", {
					type: "image/jpeg",
					lastModified: Date.now(),
				});
				mutate({ file });
			};

			void URLToFile();
		}
	};
	return (
		<Modal onClose={() => setOpenModal(false)} isOutSideClickClose={false}>
			<div className={style.fileInputDiv}>
				<div className={style.cropperDiv}>
					<Cropper src={image} ref={cropperRef} className={style.cropperMain} viewMode={3} aspectRatio={820 / 312} guides={true} />
				</div>
				<div className={style.btnDiv}>
					<button onClick={() => setOpenModal(false)} className={style.cancelBtn}>
						Cancel
					</button>
					<button onClick={() => getCropData()} className={style.uploadBtn} disabled={isLoading}>
						{isLoading ? (
							<p>
								<SmallBtnSpinner height={1.4} width={1.4} />
							</p>
						) : (
							`SUBMIT`
						)}
					</button>
				</div>
			</div>
		</Modal>
	);
};

export default ChangePictureModal;
