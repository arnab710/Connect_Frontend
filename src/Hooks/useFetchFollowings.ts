import { useQuery } from "@tanstack/react-query";
import { userFollowings } from "../Types/AfterFetchUserFollowings";
import { APIFail } from "../Types/APIFailResponseTypes";

const fetchUserFollowings = async (userID: string) => {
	const API: string = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/users/totalFollowers/${userID}`;

	const response: Response = await fetch(API, {
		credentials: "include",
	});

	const data = (await response.json()) as userFollowings | APIFail;

	if (data.result === "fail") throw new Error(data.message);

	return data;
};
const useFetchFollowings = (userID: string) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["PeopleUFollow", userID],
		queryFn: () => fetchUserFollowings(userID),
	});

	return { data, isLoading, isError };
};

export default useFetchFollowings;
