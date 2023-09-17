import { useMutation } from "@tanstack/react-query";
import { loggedInUserType } from "../Types/AfterloginUserTypes";
import { loginUserInfo } from "../Types/loginUserType";
import { APIFail } from "../Types/APIFailResponseTypes";
import { toast } from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";
import { useAppDispatch } from "../Redux/ReduxAppType/AppType";
import { updateUserFollowers, updateUserFollowings, updateUserInfo } from "../Redux/Slices/userInfoSlice";
import { updateUserValue } from "../Utils/ReduxValueUpdate";
import { useNavigate } from "react-router-dom";

const loginUser = async ({ email, password }: loginUserInfo): Promise<loggedInUserType | APIFail> => {
	const API: string = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/users/Login`;

	const response: Response = await fetch(API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
		credentials: "include",
	});
	const data = (await response.json()) as loggedInUserType | APIFail;

	if (data.result === "fail") throw new Error(data.message);

	return data;
};

const useLogin = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { mutate, data, isLoading, isError } = useMutation({
		mutationFn: loginUser,
		onError: (err: Error) => {
			toast.error(err.message, {
				style: styleObj,
			});
		},
		onSuccess: (data) => {
			if (data.result === "pass") {
				dispatch(updateUserInfo(updateUserValue(data.user)));
				dispatch(updateUserFollowers(data.user.followers));
				dispatch(updateUserFollowings(data.user.followings));
			}
			navigate("/", { replace: true });
		},
	});

	return { mutate, data, isLoading, isError };
};

export default useLogin;
