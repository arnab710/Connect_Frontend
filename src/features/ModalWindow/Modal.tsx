import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useEffect, useRef } from "react";

const StyledModal = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: #fff;
	border-radius: 15px;
	box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.2);
	padding: 2rem 1rem;
	transition: all 0.5s;
`;

const Overlay = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(255, 255, 255, 0.1);
	backdrop-filter: blur(4px);
	z-index: 1000;
	transition: all 0.5s;
`;

const Button = styled.button`
	background: none;
	border: none;
	padding: 0.4rem;
	border-radius: 5px;
	transform: translateX(0.8rem);
	transition: all 0.2s;
	position: absolute;
	top: 1.2rem;
	right: 1.9rem;
	cursor: pointer;

	&:hover {
		background-color: #f3f4f6;
	}

	& svg {
		width: 1.5rem;
		height: 1.5rem;
		/* Sometimes we need both */
		/* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
		color: #6b7280;
	}
`;

function Modal({ children, onClose, isOutSideClickClose = true }: { children: React.ReactNode; onClose: () => void; isOutSideClickClose?: boolean }) {
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (ref.current && !ref.current.contains(e.target as Node)) onClose();
		};
		if (isOutSideClickClose) document.addEventListener("click", handleClick, true);

		return () => document.removeEventListener("click", handleClick, true);
	}, [onClose, isOutSideClickClose]);

	return createPortal(
		<Overlay>
			<StyledModal ref={ref}>
				<Button onClick={onClose}>
					<HiXMark />
				</Button>

				<div>{children}</div>
			</StyledModal>
		</Overlay>,
		document.querySelector<Element>("#modal") as Element
	);
}

export default Modal;
