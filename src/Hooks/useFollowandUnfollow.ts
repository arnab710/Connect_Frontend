import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followSuccessful } from "../Types/AfterFetchFollow";
import { APIFail } from "../Types/APIFailResponseTypes";
import toast from "react-hot-toast";
import { styleObj } from "../components/notifications/errorStyle";
import { updateUserFollowings } from "../Redux/Slices/userInfoSlice";
import { useAppDispatch, useAppSelector } from "../Redux/ReduxAppType/AppType";

const followFxn = async (userID: string, action: "follow" | "unfollow") => {
	const API: string = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/users/${action === "follow" ? `follow` : `unfollow`}`;

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

const useFollowandUnfollow = (userID: string, userName: string, action: "follow" | "unfollow", visitedProfileID: string, closeModalfxn?: React.Dispatch<React.SetStateAction<boolean>>) => {
	const dispatch = useAppDispatch();
	const userData = useAppSelector((state) => state.user);
	const queryClient = useQueryClient();

	const { mutate, isLoading, isError } = useMutation({
		mutationFn: () => followFxn(userID, action),
		onError: (err: Error) => {
			toast.error(err.message, {
				style: styleObj,
			});
		},
		onSuccess: () => {
			const newFollowings = action === "follow" ? [...userData.followings, { user: userID }] : userData.followings.filter((val) => val.user !== userID);
			dispatch(updateUserFollowings(newFollowings));

			void queryClient.invalidateQueries({ queryKey: ["userInfo"] });
			void queryClient.invalidateQueries(["PeopleUFollow", userData._id]);
			void queryClient.invalidateQueries(["singleUserInfo", userID]);
			void queryClient.invalidateQueries(["singleUserInfo", visitedProfileID]);

			toast.success(`${action === "follow" ? `You are Now Following ${userName}` : `You Have Unfollowed ${userName}`}`, {
				style: styleObj,
			});
			if (closeModalfxn) closeModalfxn((c) => !c);
		},
	});

	return { mutate, isLoading, isError };
};

export default useFollowandUnfollow;
