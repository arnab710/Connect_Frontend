import { useMutation, useQueryClient } from "@tanstack/react-query";
import { successfulLikeType } from "../Types/AfterLikeTypes";
import { APIFail } from "../Types/APIFailResponseTypes";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";

const likeAPost = async ({ id }: { id: string }) => {
	const API = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/posts/like/${id}`;

	const response: Response = await fetch(API, {
		method: "POST",
		credentials: "include",
	});

	const data = (await response.json()) as successfulLikeType | APIFail;

	if (data.result === "fail") throw new Error(data.message);

	return data;
};

const useLike = (userID: string) => {
	const queryClient = useQueryClient();

	const { mutate, data, isLoading, isError } = useMutation({
		mutationFn: likeAPost,
		onError: (err: Error) => {
			toast.error(err.message, {
				style: styleObj,
			});
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["InfinitePosts"] });
			void queryClient.invalidateQueries({ queryKey: ["InfiniteUserPosts", userID] });
		},
	});

	return { mutate, data, isLoading, isError };
};

export default useLike;
