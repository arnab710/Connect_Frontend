import { likeType } from "../Types/likeTypes";
import { Action } from "../Types/signupUserType";

export const likeReducer = (state: likeType, action: Action) => {
	switch (action.type) {
		case "like":
			return { ...state, likedByUser: true, likeCount: state.likeCount + 1 };
		case "dislike":
			if (state.likeCount > 0) return { ...state, likedByUser: false, likeCount: state.likeCount - 1 };
			return state;
		default:
			return state;
	}
};
