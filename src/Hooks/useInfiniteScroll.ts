import { useInfiniteQuery } from "@tanstack/react-query";
import { allPostTypes } from "../Types/allPostTypes";
import { APIFail } from "../Types/APIFailResponseTypes";

const fetchPost = async (pageParam: number) => {
	const API: string = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/posts?limit=4&page=${pageParam}`;
	const response: Response = await fetch(API, {
		method: "GET",
		credentials: "include",
	});
	const data = (await response.json()) as allPostTypes | APIFail;

	if (data.result === "fail") throw new Error("Failed to fetch post");

	return data;
};

const useInfiniteScroll = () => {
	const { data, isLoading, isError, isFetchingNextPage, fetchNextPage } = useInfiniteQuery({
		queryKey: ["InfinitePosts"],
		queryFn: ({ pageParam = 1 }) => fetchPost(pageParam as number),
		staleTime: 24 * 60 * 60 * 1000,
		getNextPageParam: (_lastPage, pages) => pages.length + 1,
	});

	return { data, isLoading, isError, isFetchingNextPage, fetchNextPage };
};

export default useInfiniteScroll;
