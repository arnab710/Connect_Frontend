import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIFail } from "../Types/APIFailResponseTypes";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";

const uploadPost = async (file: File, inputDescription: string) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("description", inputDescription);
	if (file.type.startsWith("image")) formData.append("fileType", "image-post");
	else formData.append("fileType", file.type.split("/")[0]);

	const API = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/posts/new`;

	const response = await fetch(API, {
		method: "POST",
		body: formData,
		credentials: "include",
	});

	const data = (await response.json()) as { result: "pass"; message: string } | APIFail;
	console.log(data);
	if (data.result === "fail") throw new Error(data.message);
	return data;
};

const useUploadContent = (
	inputDescription: string,
	setFileInfo: React.Dispatch<React.SetStateAction<File | null>>,
	setInputDescription: React.Dispatch<React.SetStateAction<string>>,
	userID: string
) => {
	const queryClient = useQueryClient();

	const { mutate, isLoading, isError } = useMutation({
		mutationFn: ({ fileInfo }: { fileInfo: File }) => uploadPost(fileInfo, inputDescription),
		onSuccess: () => {
			void queryClient.refetchQueries({ queryKey: ["InfinitePosts"] });
			void queryClient.refetchQueries({ queryKey: ["InfiniteUserPosts", userID] });
			setFileInfo(null);
			toast.success("Your Post Uploaded Successfully", {
				style: styleObj,
			});
			setInputDescription("");
		},
		onError: (err: Error) => {
			setFileInfo(null);
			toast.error(err.message, {
				style: styleObj,
			});
			setInputDescription("");
		},
	});
	return { mutate, isLoading, isError };
};

export default useUploadContent;