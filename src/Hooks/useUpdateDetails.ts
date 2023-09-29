import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxAppType/AppType";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";
import { updateUserInfo } from "../Redux/Slices/userInfoSlice";
import { editUserInfoInitialState } from "../Types/editUserInfoInitialState";
import { APIFail } from "../Types/APIFailResponseTypes";

const updateDetails = async (userInfo: editUserInfoInitialState) => {
	const { firstName, lastName, bio, city, country, occupation } = userInfo;
	const API = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/users/updateMyDetails`;

	const response = await fetch(API, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ firstName, lastName, bio, city, country, occupation }),
		credentials: "include",
	});

	const data = (await response.json()) as { result: "pass"; message: "" } | APIFail;

	if (data.result === "fail") throw new Error(data.message);

	return data;
};

const useUpdateDetails = (setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>, userInfo: editUserInfoInitialState) => {
	const queryClient = useQueryClient();
	const userID = useAppSelector((state) => state.user._id);
	const dispatch = useAppDispatch();

	const { mutate, isLoading, isError } = useMutation({
		mutationFn: () => updateDetails(userInfo),
		onSuccess: (data) => {
			const { firstName, lastName, bio, city, country, occupation } = userInfo;

			dispatch(updateUserInfo({ firstName, lastName, bio, city, country, occupation }));
			void queryClient.refetchQueries(["userInfo"]);
			void queryClient.refetchQueries(["singleUserInfo", userID]);
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

export default useUpdateDetails;
