/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useInfiniteQuery } from "@tanstack/react-query";
import { APIFail } from "../Types/APIFailResponseTypes";
import { allPostTypes } from "../Types/allPostTypes";

const fetchPost = async (pageParam: number, id: string) => {
	const API: string = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/posts/singleUser/${id}?limit=2&page=${pageParam}`;
	const response: Response = await fetch(API, {
		method: "GET",
		credentials: "include",
	});
	const data = (await response.json()) as allPostTypes | APIFail;

	if (data.result === "fail") throw new Error("Failed to fetch post");

	return data;
};

const useUserInfinitePost = (id: string) => {
	const { data, isLoading, isError, isFetchingNextPage, fetchNextPage, isRefetching } = useInfiniteQuery({
		queryKey: ["InfiniteUserPosts", id],
		queryFn: ({ pageParam = 1 }) => fetchPost(pageParam, id),
		staleTime: 24 * 60 * 60 * 1000,
		getNextPageParam: (_lastPage, pages) => pages.length + 1,
	});

	return { data, isLoading, isError, isFetchingNextPage, fetchNextPage, isRefetching };
};

export default useUserInfinitePost;
