import React, { useEffect, useRef } from "react";
import style from "./MiddlePostFeed.module.css";
import EachPost from "../EachPost/EachPost";
import useInfiniteScroll from "../../Hooks/useInfiniteScroll";
import useIntersectionObserver from "../../Hooks/useIntersectionObserver";
import EachPostSkeleton from "../EachPostSkeleton/EachPostSkeleton";
import NewPostInput from "../newPostInput/NewPostInput";

const MiddlePostFeed: React.FC = () => {
	const { data, isLoading, isFetchingNextPage, fetchNextPage } = useInfiniteScroll();
	const endRef = useRef<HTMLDivElement | null>(null);

	const isEndVisible = useIntersectionObserver(endRef, { threshold: 0 });

	useEffect(() => {
		if (isEndVisible && !isFetchingNextPage && data && data.pages[data.pages.length - 1].UpdatedPosts.length > 1) {
			void fetchNextPage();
		}
	}, [isEndVisible, isFetchingNextPage, fetchNextPage, data]);

	return (
		<div className={style.MiddlePostFeedBackground}>
			<NewPostInput />
			{data?.pages.map((eachPage) => eachPage?.UpdatedPosts?.map((post) => <EachPost post={post} key={post._id} />))}
			{(isLoading || isFetchingNextPage) && <EachPostSkeleton />}

			<div ref={endRef} style={{ height: `1px` }}></div>
		</div>
	);
};

export default MiddlePostFeed;
