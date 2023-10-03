import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIFail } from "../Types/APIFailResponseTypes";
import { useAppSelector } from "../Redux/ReduxAppType/AppType";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";

const deletePost = async (postID: string) => {
	const API = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/posts/delete/${postID}`;

	const response: Response = await fetch(API, {
		method: "DELETE",
		credentials: "include",
	});

	const data = (await response.json()) as { result: "pass"; message: string } | APIFail;

	if (data.result === "fail") throw new Error(data.message);

	return data;
};

const useDeletePost = (postID: string, setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
	const queryClient = useQueryClient();
	const userID = useAppSelector((state) => state.user._id);

	const { mutate, isLoading, isError } = useMutation({
		mutationFn: () => deletePost(postID),
		onSuccess: async (data) => {
			await queryClient.refetchQueries({ queryKey: ["InfinitePosts"] });
			await queryClient.refetchQueries({ queryKey: ["InfiniteUserPosts", userID] });
			await queryClient.invalidateQueries({ queryKey: ["singleUserInfo", userID] });
			setIsOpenModal((curr) => !curr);
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

export default useDeletePost;
