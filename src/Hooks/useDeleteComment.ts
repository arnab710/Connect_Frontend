import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../Types/SuccessfulCommentDelete";
import { APIFail } from "../Types/APIFailResponseTypes";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";

const DeleteComment = async (id: string) => {
	const API: string = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/posts/comments/${id}`;
	const response: Response = await fetch(API, {
		method: "DELETE",
		credentials: "include",
	});

	const data = (await response.json()) as deleteComment | APIFail;

	if (data.result === "fail") throw new Error(data.message);
	return data;
};
const useDeleteComment = (id: string, setCountComment: React.Dispatch<React.SetStateAction<number>>, postID: string, userID: string) => {
	const queryClient = useQueryClient();
	const { mutate, isLoading, isError } = useMutation({
		mutationFn: () => DeleteComment(id),
		onSuccess: async (data) => {
			setCountComment((s) => s - 1);
			const promise1 = queryClient.invalidateQueries({ queryKey: ["topComments", postID] });
			const promise2 = queryClient.invalidateQueries({ queryKey: ["InfinitePosts"] });
			const promise3 = queryClient.invalidateQueries({ queryKey: ["InfiniteUserPosts", userID] });

			await Promise.all([promise1, promise2, promise3]);

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
	return { mutate, isLoading, isError };
};

export default useDeleteComment;
