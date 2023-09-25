import { useQuery } from "@tanstack/react-query";
import { userInfoFetch } from "../Types/userInfoFetchType";
import { APIFail } from "../Types/APIFailResponseTypes";

const FetchUserInfo = async (userID: string) => {
	const API: string = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/users/singleUser/${userID}`;
	const response = await fetch(API, {
		credentials: "include",
	});
	const data = (await response.json()) as userInfoFetch | APIFail;

	if (data.result === "fail") throw new Error(data.message);

	return data;
};

const useFetchUserInfo = (userID: string) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["singleUserInfo", userID],
		queryFn: () => FetchUserInfo(userID),
		staleTime: 24 * 60 * 60 * 1000,
	});

	return { data, isLoading, isError };
};

export default useFetchUserInfo;
