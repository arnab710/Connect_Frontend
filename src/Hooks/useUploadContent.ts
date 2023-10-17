/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIFail } from "../Types/APIFailResponseTypes";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";

const uploadPost = async (file: File | null, inputDescription: string) => {
	let result;
	if (file) {
		let fileType;
		if (file.type.startsWith("image")) fileType = "image-post";
		else fileType = file.type.split("/")[0];
		const API = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/posts/signature`;

		const response1 = await fetch(API, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ fileType }),
			credentials: "include",
		});

		const data = (await response1.json()) as { result: "pass"; signature: string; timestamp: number } | APIFail;
		if (data.result === "fail") throw new Error(data.message);

		const transformationStr =
			fileType === "profile-picture"
				? "c_fill,h_500,w_500,q_auto,f_auto"
				: fileType === "cover-photo"
				? "c_fill,h_312,w_820,q_auto,f_auto"
				: fileType === "image-post"
				? "c_fill,h_1350,w_1080,q_auto,f_auto"
				: fileType === "video"
				? "c_fill,h_400,w_600"
				: "af_8000,ac_mp3";

		const cloudinaryForm = new FormData();
		cloudinaryForm.append("file", file);
		cloudinaryForm.append("timestamp", String(data.timestamp));
		cloudinaryForm.append("signature", data.signature);
		cloudinaryForm.append("api_key", String(import.meta.env.VITE_CLOUDINARY_API_KEY));
		cloudinaryForm.append("transformation", transformationStr);

		const uploadURL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`;

		const response = await fetch(uploadURL, { method: "POST", body: cloudinaryForm });
		result = await response.json();
	}
	const API2 = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/posts/new`;

	const requestBody = result
		? {
				file_secure_url: String(result.secure_url),
				public_id: String(result.public_id),
				resource_type: String(result.resource_type),
				description: inputDescription,
				audio: result.format === "mp3" ? true : false,
		  }
		: { description: inputDescription };

	const response = await fetch(API2, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(requestBody),
		credentials: "include",
	});

	const result2 = (await response.json()) as { result: "pass"; message: "Post Created Successfully" } | APIFail;

	if (result2.result === "fail") throw new Error(result2.message);

	return result2;
};

const useUploadContent = (
	inputDescription: string,
	setFileInfo: React.Dispatch<React.SetStateAction<File | null>>,
	setInputDescription: React.Dispatch<React.SetStateAction<string>>,
	userID: string
) => {
	const queryClient = useQueryClient();

	const { mutate, isLoading, isError } = useMutation({
		mutationFn: ({ fileInfo }: { fileInfo: File | null }) => uploadPost(fileInfo, inputDescription),
		onSuccess: async () => {
			const promise1 = queryClient.refetchQueries({ queryKey: ["InfinitePosts"] });
			const promise2 = queryClient.refetchQueries({ queryKey: ["InfiniteUserPosts", userID] });
			const promise3 = queryClient.invalidateQueries({ queryKey: ["singleUserInfo", userID] });

			await Promise.all([promise1, promise2, promise3]);

			setFileInfo(null);
			setInputDescription("");
			toast.success("Your Post Uploaded Successfully", {
				style: styleObj,
			});
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
