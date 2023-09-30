import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";
import { APIFail } from "../Types/APIFailResponseTypes";

const forgotPasswordFxn = async ({ email }: { email: string }) => {
	const API = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/users/forget-password`;

	const response = await fetch(API, {
		method: "POST",
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_SENDGRID_API}`,
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email }),
		credentials: "include",
	});

	const data = (await response.json()) as { result: "pass"; message: string } | APIFail;

	if (data.result === "fail") throw new Error(data.message);

	return data;
};

const useForgotPassword = () => {
	const { mutate, isLoading, isError, isSuccess } = useMutation({
		mutationFn: forgotPasswordFxn,
		onSuccess: (data) => {
			toast.success(data.message, {
				style: styleObj,
			});
		},
		onError: (err: Error) => {
			toast.error(err.message, {
				style: styleObj,
			});
		},
	});

	return { mutate, isLoading, isError, isSuccess };
};

export default useForgotPassword;
