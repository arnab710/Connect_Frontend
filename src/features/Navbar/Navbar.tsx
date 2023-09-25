import { FiSearch } from "react-icons/fi";
import { MdNotifications } from "react-icons/md";
import { AiFillSetting, AiOutlineUser, AiOutlineEdit } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { BiSolidUser, BiLogOut } from "react-icons/bi";
import React, { useEffect, useRef, useState } from "react";
import style from "./Navbar.module.css";
import Icon from "../Icon/Icon";
import { useAppSelector } from "../../Redux/ReduxAppType/AppType";
import useLogout from "../../Hooks/useLogout";
import ModalContent from "../../components/ModalContent/ModalContent";
import { Link, NavLink } from "react-router-dom";

const Navbar: React.FC = () => {
	const userPicture = useAppSelector((state) => state.user.profilePicture);

	const [mobileDropDown, setMobileDropDown] = useState(false);
	const [logoutPopUp, setLogoutPopUp] = useState(false);
	const dropDownRef = useRef<HTMLUListElement | null>(null);

	const { mutate: logout, isLoading } = useLogout();

	useEffect(() => {
		function handleClickOutside(event: Event) {
			if (dropDownRef.current && !dropDownRef.current.contains(event.target as Node)) {
				setMobileDropDown(false);
			}
		}
		document.addEventListener("click", handleClickOutside);

		return () => {
			document.removeEventListener("click", handleClickOutside);
		};
	}, []);

	return (
		<>
			<div className={style.NavbarBackground}>
				<div className={style.navBarLeftDiv}>
					<Icon classStyle={style.iconStyle} />
					<div className={style.inputDiv}>
						<FiSearch className={style.searchIcon} />
						<input type="text" placeholder="Search..." className={style.input} />
					</div>
				</div>
				<ul className={style.navBarRightDiv}>
					<li className={style.rightIcon1}>
						<MdNotifications />
					</li>
					<li className={style.rightIcon2}>
						<AiFillSetting />
						<ul className={style.settingIconBar}>
							<li>
								<AiOutlineEdit className={style.dropdownIcon} />
								<p>Edit Profile</p>
							</li>
							<Link to="/my-profile">
								<AiOutlineUser className={style.dropdownIcon} />
								<p>Your Profile</p>
							</Link>
							<li onClick={() => setLogoutPopUp((s) => !s)}>
								<BiLogOut className={style.dropdownIcon} />
								<p>Log Out</p>
							</li>
						</ul>
					</li>
					<NavLink to="/my-profile" className={style.rightIcon3}>
						<BiSolidUser />
					</NavLink>
					<li className={style.rightIconReport} onClick={() => setLogoutPopUp((s) => !s)}>
						<BiLogOut />
					</li>
					<li
						className={`${mobileDropDown ? style.mobileDropDownTrue : style.hamBurger}`}
						onClick={(e) => {
							e.stopPropagation();
							setMobileDropDown((state) => !state);
						}}
					>
						<GiHamburgerMenu className={`${mobileDropDown ? style.colouring : ""}`} />
						<ul className={style.hamBurgerList} ref={dropDownRef} onClick={(e) => e.stopPropagation()}>
							<Link to="/my-profile">
								<AiOutlineUser />
								<p>Your Profile</p>
							</Link>
							<li>
								<AiOutlineEdit />
								<p>Edit Profile</p>
							</li>
							<li onClick={() => setLogoutPopUp((s) => !s)} className={style.redLogOut}>
								<BiLogOut />
								<p>Log Out</p>
							</li>
						</ul>
					</li>
					<li className={style.profilePictureDiv}>
						<img
							src={userPicture ? userPicture : "https://res.cloudinary.com/dmrlrtwbb/image/upload/v1694760858/24-248253_user-profile-default-image-png-clipart-png-download_zurjod.png"}
							alt="user's picture"
							className={style.profilePicture}
						/>
					</li>
				</ul>
			</div>
			{logoutPopUp && (
				<ModalContent isLoading={isLoading} setOpenModal={setLogoutPopUp} mutateFxn={logout} header="Logout Confirmation" para="Do You Really Wish to Leave and Logout?" button="Logout" />
			)}
		</>
	);
};

export default Navbar;
