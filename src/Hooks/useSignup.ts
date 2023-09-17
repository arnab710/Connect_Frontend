import { useMutation } from "@tanstack/react-query";
import { IUserType } from "../Types/signupUserType";
import { AfterSignupUserType } from "../Types/AfterSignupUserTypes";
import { APIFail } from "../Types/APIFailResponseTypes";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";
import { useAppDispatch } from "../Redux/ReduxAppType/AppType";
import { updateUserInfo } from "../Redux/Slices/userInfoSlice";
import { updateUserValue } from "../Utils/ReduxValueUpdate";
import { useNavigate } from "react-router-dom";

const signupFxn = async ({ firstName, lastName, email, password, confirmPassword, country, city, bio, occupation }: IUserType) => {
	const API: string = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/users/sign-up`;

	const response: Response = await fetch(API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ firstName, lastName, confirmPassword, country, city, bio, occupation, email, password }),
		credentials: "include",
	});

	const data = (await response.json()) as AfterSignupUserType | APIFail;

	if (data.result === "fail") throw new Error(data.message);

	return data;
};

const useSignup = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const { mutate, isLoading, data } = useMutation({
		mutationFn: signupFxn,
		onError: (err: Error) => {
			toast.error(err.message, {
				style: styleObj,
			});
		},
		onSuccess: (data) => {
			if (data.result === "pass") dispatch(updateUserInfo(updateUserValue(data.newUser)));
			navigate("/", { replace: true });
		},
	});

	return { mutate, isLoading, data };
};

export default useSignup;
