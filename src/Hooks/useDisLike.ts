import { useMutation } from "@tanstack/react-query";
import { successfulLikeType } from "../Types/AfterLikeTypes";
import { APIFail } from "../Types/APIFailResponseTypes";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";

const dislikeAPost = async ({ id }: { id: string }) => {
	const API = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/posts/dislike/${id}`;

	const response: Response = await fetch(API, {
		method: "POST",
		credentials: "include",
	});

	const data = (await response.json()) as successfulLikeType | APIFail;

	if (data.result === "fail") throw new Error(data.message);

	return data;
};

const useDisLike = () => {
	const { mutate, data, isLoading, isError } = useMutation({
		mutationFn: dislikeAPost,
		onError: (err: Error) => {
			toast.error(err.message, {
				style: styleObj,
			});
		},
	});

	return { mutate, data, isLoading, isError };
};

export default useDisLike;
