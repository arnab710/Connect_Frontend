import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Redux/ReduxAppType/AppType";
import useUserInfoFetch from "../../Hooks/useUserInfoFetch";
import { useNavigate } from "react-router-dom";
import Loader from "../ScreenLoader/Loader";
import { updateUserFollowers, updateUserFollowings, updateUserInfo } from "../../Redux/Slices/userInfoSlice";
import { updateUserValue } from "../../Utils/ReduxValueUpdate";

const ProtectedLayout = () => {
	const [enabled, setEnabled] = useState(false);
	const userID = useAppSelector((state) => state.user._id);
	const { data, isLoading, isError } = useUserInfoFetch(enabled);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!userID) setEnabled(true);
	}, [userID]);

	useEffect(() => {
		if (!userID && data?.result === "fail" && !isError) navigate("/login");
		else if (data?.result === "pass") {
			dispatch(updateUserInfo(updateUserValue(data.myInfo)));
			dispatch(updateUserFollowers(data.myInfo.followers));
			dispatch(updateUserFollowings(data.myInfo.followings));
		}
	}, [data, navigate, userID, dispatch, isError]);

	return <>{isLoading && !userID ? <Loader /> : <Outlet />}</>;
};

export default ProtectedLayout;
