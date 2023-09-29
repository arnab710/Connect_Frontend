import { editUserInfoInitialState } from "../Types/editUserInfoInitialState";

export type ActionUser = {
	type: string;
	payload: string;
};

export const userInfoReducer = (state: editUserInfoInitialState, action: ActionUser) => {
	switch (action.type) {
		case "firstName":
			return { ...state, firstName: action.payload };
		case "lastName":
			return { ...state, lastName: action.payload };
		case "city":
			return { ...state, city: action.payload };
		case "country":
			return { ...state, country: action.payload };
		case "bio":
			return { ...state, bio: action.payload };
		case "occupation":
			return { ...state, occupation: action.payload };
		case "updateProfilePicture":
			return { ...state, updateProfilePicture: action.payload };
		case "updateCoverPhoto":
			return { ...state, updateCoverPhoto: action.payload };
		default:
			return state;
	}
};
