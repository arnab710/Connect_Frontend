/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import styled, { keyframes } from "styled-components";
import { BiLoaderAlt } from "react-icons/bi";

const rotate = keyframes`
  to {
    transform: rotate(1turn)
  }
`;

const SmallBtnSpinner = styled(BiLoaderAlt)`
	width: ${(props) => (props.height ? `${props.height}px` : `1.5rem`)};
	height: ${(props) => (props.height ? `${props.width}px` : `1.5rem`)};
	animation: ${rotate} 1.5s infinite linear;
`;

export default SmallBtnSpinner;
