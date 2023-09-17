interface PostType {
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
}

export interface PostPropType {
	post: PostType;
}
