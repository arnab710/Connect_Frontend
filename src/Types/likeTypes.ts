export interface likeType {
	likeCount: number;
	likedByUser: boolean;
}
export type ActionLike = {
	type: string;
	payload?: {
		likeCount: number;
		likedByUser: boolean;
	};
};
