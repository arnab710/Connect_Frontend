import React from "react";
import EachCommentSkeleton from "../EachCommentSkeleton/EachCommentSkeleton";

const totalCommentSkeleton: React.FC = () => {
	return (
		<>
			<EachCommentSkeleton />
			<EachCommentSkeleton />
			<EachCommentSkeleton />
			<EachCommentSkeleton />
		</>
	);
};

export default totalCommentSkeleton;
