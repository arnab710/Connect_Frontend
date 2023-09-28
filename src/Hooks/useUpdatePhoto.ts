import { useMutation, useQueryClient } from "@tanstack/react-query";
import { APIFail } from "../Types/APIFailResponseTypes";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxAppType/AppType";
import { updateUserInfo } from "../Redux/Slices/userInfoSlice";

const uploadPicture = async ({ file }: { file: File }) => {
	const formData = new FormData();
	formData.append("file", file);
	formData.append("fileType", "cover-photo");

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

const useUpdatePhoto = (setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>) => {
	const queryClient = useQueryClient();
	const userID = useAppSelector((state) => state.user._id);
	const dispatch = useAppDispatch();

	const { mutate, isLoading, isError } = useMutation({
		mutationFn: uploadPicture,
		onSuccess: (data) => {
			dispatch(updateUserInfo({ coverPicture: data.imgFileLink }));
			void queryClient.invalidateQueries(["userInfo"]);
			void queryClient.invalidateQueries(["singleUserInfo", userID]);
			setIsOpenModal((curr) => !curr);
		},
		onError: () => {},
	});

	return { mutate, isLoading, isError };
};

export default useUpdatePhoto;
