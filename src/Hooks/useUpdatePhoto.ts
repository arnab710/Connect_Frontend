/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIFail } from "../Types/APIFailResponseTypes";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxAppType/AppType";
import { updateUserInfo } from "../Redux/Slices/userInfoSlice";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";

const uploadPicture = async ({ file }: { file: File }, fileType: "profile-picture" | "cover-photo" | null) => {
	// const formData = new FormData();
	// formData.append("file", file);
	// if (fileType) formData.append("fileType", fileType);
	if (!fileType) throw new Error("FileType Not Specified");

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

	const transformationStr = fileType === "profile-picture" ? "c_fill,h_500,w_500,q_auto,f_auto" : "c_fill,h_312,w_820,q_auto,f_auto";

	const cloudinaryForm = new FormData();
	cloudinaryForm.append("file", file);
	cloudinaryForm.append("timestamp", String(data.timestamp));
	cloudinaryForm.append("signature", data.signature);
	cloudinaryForm.append("api_key", String(import.meta.env.VITE_CLOUDINARY_API_KEY));
	cloudinaryForm.append("transformation", transformationStr);

	const uploadURL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/auto/upload`;

	const response = await fetch(uploadURL, { method: "POST", body: cloudinaryForm });
	const result = await response.json();

	const API2 = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/users/updateMyDetails`;

	const response2 = await fetch(API2, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ file_secure_url: result.secure_url, fileType }),
		credentials: "include",
	});

	const data2 = (await response2.json()) as { result: "pass"; message: string; imgFileLink: string } | APIFail;

	if (data2.result === "fail") throw new Error(data2.message);

	return data2;
	// const API = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/users/updateMyDetails`;

	// const response = await fetch(API, {
	// 	method: "PATCH",
	// 	body: formData,
	// 	credentials: "include",
	// });

	// const data = (await response.json()) as { result: "pass"; message: string; imgFileLink: string } | APIFail;

	// if (data.result === "fail") throw new Error(data.message);

	// return data;
};

const useUpdatePhoto = (setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>, fileType: "profile-picture" | "cover-photo" | null) => {
	const queryClient = useQueryClient();
	const userID = useAppSelector((state) => state.user._id);
	const dispatch = useAppDispatch();

	const { mutate, isLoading, isError } = useMutation({
		mutationFn: ({ file }: { file: File }) => uploadPicture({ file }, fileType),
		onSuccess: async (data) => {
			if (fileType === "cover-photo") dispatch(updateUserInfo({ coverPicture: data.imgFileLink }));
			else dispatch(updateUserInfo({ profilePicture: data.imgFileLink }));
			const promise1 = queryClient.refetchQueries(["userInfo"]);
			const promise2 = queryClient.refetchQueries(["singleUserInfo", userID]);

			await Promise.all([promise1, promise2]);

			setIsOpenModal((curr) => !curr);
			toast.success(`${fileType === "cover-photo" ? `Cover Photo Changed Successfully ` : `Profile Picture Changed Successfully`}`, {
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

export default useUpdatePhoto;
