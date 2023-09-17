import { Action, IUserType } from "../Types/signupUserType";

export const signupReducer = (state: IUserType, action: Action): IUserType => {
	switch (action.type) {
		case "CHANGE_FIRST_NAME":
			return { ...state, firstName: action.payload ? action.payload : "" };
		case "CHANGE_LAST_NAME":
			return { ...state, lastName: action.payload ? action.payload : "" };
		case "CHANGE_EMAIL":
			return { ...state, email: action.payload ? action.payload : "" };
		case "CHANGE_PASSWORD":
			return { ...state, password: action.payload ? action.payload : "" };
		case "CHANGE_CONFIRM_PASSWORD":
			return { ...state, confirmPassword: action.payload ? action.payload : "" };
		case "CHANGE_COUNTRY":
			return { ...state, country: action.payload ? action.payload : "" };
		case "CHANGE_CITY":
			return { ...state, city: action.payload ? action.payload : "" };
		case "CHANGE_BIO":
			return { ...state, bio: action.payload ? action.payload : "" };
		case "CHANGE_OCCUPATION":
			return { ...state, occupation: action.payload ? action.payload : "" };
		default:
			return state;
	}
};
