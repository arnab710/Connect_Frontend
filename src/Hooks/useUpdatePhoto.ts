import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIFail } from "../Types/APIFailResponseTypes";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxAppType/AppType";
import { updateUserInfo } from "../Redux/Slices/userInfoSlice";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";

const uploadPicture = async ({ file }: { file: File }, fileType: "profile-picture" | "cover-photo" | null) => {
	const formData = new FormData();
	formData.append("file", file);
	if (fileType) formData.append("fileType", fileType);
	else throw new Error("FileType Not Specified");

	const API = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/users/updateMyDetails`;

	const response = await fetch(API, {
		method: "PATCH",
		body: formData,
		credentials: "include",
	});

	const data = (await response.json()) as { result: "pass"; message: string; imgFileLink: string } | APIFail;

	if (data.result === "fail") throw new Error(data.message);

	return data;
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
