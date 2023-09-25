import React, { useEffect, useRef } from "react";
import style from "./SingleUserPosts.module.css";
import useUserInfinitePost from "../../Hooks/useUserInfinitePost";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";
import EachPost from "../EachPost/EachPost";
import EachPostSkeleton from "../EachPostSkeleton/EachPostSkeleton";

const SingleUserPosts: React.FC<{ userID: string }> = ({ userID }) => {
	const { data, isLoading, isFetchingNextPage, fetchNextPage } = useUserInfinitePost(userID);

	const endRef = useRef<HTMLDivElement | null>(null);
	const isEndVisible = useIntersectionObserver(endRef, { threshold: 0 });

	useEffect(() => {
		if (isEndVisible && !isFetchingNextPage && data && data.pages[data.pages.length - 1].UpdatedPosts.length > 1) {
			void fetchNextPage();
		}
	}, [isEndVisible, isFetchingNextPage, fetchNextPage, data]);

	return (
		<div className={style.backgroundDiv}>
			{data?.pages.map((eachPage) => eachPage?.UpdatedPosts?.map((post) => <EachPost post={post} key={post._id} />))}
			{(isLoading || isFetchingNextPage) && <EachPostSkeleton />}
			<div style={{ height: `1px` }} ref={endRef}></div>
		</div>
	);
};

export default SingleUserPosts;
