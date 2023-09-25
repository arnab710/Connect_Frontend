import { ActionLike, likeType } from "../Types/likeTypes";

export const likeReducer = (state: likeType, action: ActionLike) => {
	switch (action.type) {
		case "like":
			return { ...state, likedByUser: true, likeCount: state.likeCount + 1 };
		case "dislike":
			if (state.likeCount > 0) return { ...state, likedByUser: false, likeCount: state.likeCount - 1 };
			return state;
		case "postChange":
			if (action.payload) return { ...state, likedByUser: action.payload.likedByUser, likeCount: action.payload.likeCount };
			return state;
		default:
			return state;
	}
};
