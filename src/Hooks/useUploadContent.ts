import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIFail } from "../Types/APIFailResponseTypes";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";

const uploadPost = async (file: File, inputDescription: string, inputType: "image" | "audio" | "video") => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("description", inputDescription);
	if (inputType === "image") formData.append("fileType", "image-post");
	else formData.append("fileType", inputType);

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
	setInputType: React.Dispatch<React.SetStateAction<"image" | "audio" | "video" | null>>
) => {
	const queryClient = useQueryClient();

	const { mutate, isLoading, isError } = useMutation({
		mutationFn: ({ fileInfo, inputType }: { fileInfo: File; inputType: "audio" | "video" | "image" }) => uploadPost(fileInfo, inputDescription, inputType),
		onSuccess: () => {
			void queryClient.invalidateQueries({ queryKey: ["InfinitePosts"] });
			setFileInfo(null);
			setInputType(null);
			toast.success("Your Post Uploaded Successfully", {
				style: styleObj,
			});
		},
		onError: (err: Error) => {
			setFileInfo(null);
			setInputType(null);
			toast.error(err.message, {
				style: styleObj,
			});
		},
	});
	return { mutate, isLoading, isError };
};

export default useUploadContent;
