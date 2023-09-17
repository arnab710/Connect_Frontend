export interface allPostTypes {
	result: "pass";
	UpdatedPosts: {
		_id: string;
		user: { _id: string; firstName: string; lastName: string; profilePicture: string };
		description: string;
		picture?: string;
		video?: string;
		likes: number;
		comments: number;
		createdAt: string;
		updatedAt: string;
		alreadyLiked: boolean;
	}[];
}
