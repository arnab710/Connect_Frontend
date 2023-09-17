import { useQuery } from "@tanstack/react-query";
import { APIFail } from "../Types/APIFailResponseTypes";
import { UserDetails } from "../Types/UserDetailsTypes";

const fetchUser = async (): Promise<UserDetails | APIFail> => {
	const API: string = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/users/My-Details`;

	const response: Response = await fetch(API, {
		credentials: "include",
	});

	const data = (await response.json()) as UserDetails | APIFail;

	if (data.result === "fail") throw new Error(data.message);
	return data;
};

const useUserInfoFetch = (enabled: boolean = false) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["userInfo"],
		queryFn: fetchUser,
		staleTime: 24 * 60 * 60 * 1000,
		enabled,
	});
	return { data, isLoading, isError };
};

export default useUserInfoFetch;
