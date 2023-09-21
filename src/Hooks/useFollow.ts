import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followSuccessful } from "../Types/AfterFetchFollow";
import { APIFail } from "../Types/APIFailResponseTypes";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";
import { updateUserFollowings } from "../Redux/Slices/userInfoSlice";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxAppType/AppType";

const followFxn = async (userID: string) => {
	const API: string = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/users/follow`;

	const response: Response = await fetch(API, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ id: userID }),
		credentials: "include",
	});

	const data = (await response.json()) as followSuccessful | APIFail;

	if (data.result === "fail") throw new Error(data.message);

	return data;
};

const useFollow = (userID: string, userName: string) => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector((state) => state.user);
	const queryClient = useQueryClient();

	const { mutate, isLoading, isError } = useMutation({
		mutationFn: () => followFxn(userID),
		onError: (err: Error) => {
			toast.error(err.message, {
				style: styleObj,
			});
		},
		onSuccess: () => {
			const newFollowings = [...userData.followings, { user: userID }];
			dispatch(updateUserFollowings(newFollowings));

			void queryClient.invalidateQueries({ queryKey: ["userInfo"] });
			void queryClient.invalidateQueries(["PeopleUFollow", userData._id]);

			toast.success(`You are Now Following ${userName}`, {
				style: styleObj,
			});
		},
	});

	return { mutate, isLoading, isError };
};

export default useFollow;
