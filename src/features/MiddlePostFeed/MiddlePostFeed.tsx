import React, { useEffect, useMemo, useRef } from "react";
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

	const memoisedData = useMemo(() => data, [data]);

	useEffect(() => {
		if (isEndVisible && !isFetchingNextPage && memoisedData && memoisedData.pages[memoisedData.pages.length - 1].UpdatedPosts.length > 1) {
			void fetchNextPage();
		}
	}, [isEndVisible, isFetchingNextPage, fetchNextPage, memoisedData]);

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
