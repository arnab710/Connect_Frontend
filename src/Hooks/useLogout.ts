import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIFail } from "../Types/APIFailResponseTypes";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";
import { logout } from "../Types/AfterLogoutDataType";
import { useAppDispatch } from "../Redux/ReduxAppType/AppType";
import { deleteUserInfo } from "../Redux/Slices/userInfoSlice";
import { useNavigate } from "react-router-dom";

const logOutUser = async () => {
	const API = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/users/Logout`;
	const response: Response = await fetch(API, {
		method: "POST",
		credentials: "include",
	});

	const data = (await response.json()) as APIFail | logout;

	if (data.result === "fail") throw new Error(data.message);

	return data;
};

const useLogout = () => {
	const dispatch = useAppDispatch();
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const { mutate, data, isLoading, isError } = useMutation({
		mutationFn: logOutUser,
		onError: (err: Error) => {
			toast.error(err.message, {
				style: styleObj,
			});
		},
		onSuccess: () => {
			dispatch(deleteUserInfo());
			queryClient.removeQueries();
			navigate("/login");
		},
	});

	return { mutate, data, isLoading, isError };
};

export default useLogout;
