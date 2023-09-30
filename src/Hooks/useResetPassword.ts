import { useMutation } from "@tanstack/react-query";
import { APIFail } from "../Types/APIFailResponseTypes";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";

const resetPasswordFxn = async ({ newPassword, confirmNewPassword }: { newPassword: string; confirmNewPassword: string }, resetToken: string) => {
	const API = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/users/reset-password`;

	const response = await fetch(API, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ newPassword, confirmNewPassword, resetToken }),
	});

	const data = (await response.json()) as { result: "pass"; message: string } | APIFail;

	if (data.result === "fail") throw new Error(data.message);

	return data;
};

const useResetPassword = (resetToken: string) => {
	const { mutate, isLoading, isError, isSuccess } = useMutation({
		mutationFn: ({ newPassword, confirmNewPassword }: { newPassword: string; confirmNewPassword: string }) => resetPasswordFxn({ newPassword, confirmNewPassword }, resetToken),
		onError: (err: Error) => {
			toast.error(err.message, {
				style: styleObj,
			});
		},
		onSuccess: (data) => {
			toast.success(data.message, {
				style: styleObj,
			});
		},
	});

	return { mutate, isLoading, isError, isSuccess };
};

export default useResetPassword;
