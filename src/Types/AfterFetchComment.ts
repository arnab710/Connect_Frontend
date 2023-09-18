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
