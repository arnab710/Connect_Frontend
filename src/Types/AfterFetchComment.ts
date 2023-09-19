export interface allCommentType {
	result: "pass";
	allComments: eachCommentType[];
}
export interface eachCommentType {
	_id: string;
	user: {
		_id: string;
		firstName: string;
		lastName: string;
		profilePicture: string;
	};
	comment: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}
export interface IpostComment {
	result: "pass";
	message: string;
	newComment: {
		post: string;
		user: string;
		comment: string;
		_id: string;
		createdAt: string;
		updatedAt: string;
		__v: string;
	};
}
