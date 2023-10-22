import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IpostComment } from "../Types/AfterFetchComment";
import { APIFail } from "../Types/APIFailResponseTypes";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";

const postComment = async (id: string, comment: string) => {
	const API = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/posts/comments/new`;

	const response: Response = await fetch(API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ post: id, comment }),
		credentials: "include",
	});

	const data = (await response.json()) as IpostComment | APIFail;

	if (data.result === "fail") throw new Error(data.message);

	return data;
};

const usePostComment = (id: string, comment: string, setCountComment: React.Dispatch<React.SetStateAction<number>>, setInput: React.Dispatch<React.SetStateAction<string>>, userID: string) => {
	const queryClient = useQueryClient();

	const { mutate, isError, isLoading } = useMutation({
		mutationFn: () => postComment(id, comment),
		onSuccess: async () => {
			const promise1 = queryClient.invalidateQueries({ queryKey: ["topComments", id] });
			setCountComment((c) => c + 1);
			setInput("");
			const promise2 = queryClient.invalidateQueries({ queryKey: ["InfinitePosts"] });
			const promise3 = queryClient.invalidateQueries({ queryKey: ["InfiniteUserPosts", userID] });

			await Promise.all([promise1, promise2, promise3]);
		},
		onError: (err: Error) => {
			toast.error(err.message, {
				style: styleObj,
			});
		},
	});

	return { mutate, isError, isLoading };
};

export default usePostComment;
