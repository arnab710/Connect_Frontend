import { useQuery } from "@tanstack/react-query";
import { APIFail } from "../Types/APIFailResponseTypes";
import { allCommentType } from "../Types/AfterFetchComment";

const fetchComments = async (postID: string) => {
	const API: string = `${import.meta.env.VITE_BACKEND_APP_PORT}/${import.meta.env.VITE_BACKEND_APP_API}/posts/comments/${postID}`;

	const response: Response = await fetch(API, {
		credentials: "include",
	});

	const data = (await response.json()) as allCommentType | APIFail;

	if (data.result === "fail") throw new Error(data.message);

	return data;
};

const useAllCommentFetch = (enabler: boolean, postID: string) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["topComments", postID],
		queryFn: () => fetchComments(postID),
		enabled: enabler,
		staleTime: 24 * 60 * 60 * 1000,
	});

	return { data, isLoading, isError };
};

export default useAllCommentFetch;
