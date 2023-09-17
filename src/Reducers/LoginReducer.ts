import { loginUserInfo } from "../Types/loginUserType";
import { Action } from "../Types/signupUserType";

type LoginReducerType = (state: loginUserInfo, action: Action) => loginUserInfo;

export const loginReducer: LoginReducerType = (state: loginUserInfo, action: Action) => {
	switch (action.type) {
		case "CHANGE_EMAIL":
			return action.payload ? { ...state, email: action.payload } : { ...state, email: "" };
		case "CHANGE_PASSWORD":
			return action.payload ? { ...state, password: action.payload } : { ...state, password: "" };
		case "RESET_FIELDS":
			return { email: "", password: "" };
		default:
			return state;
	}
};
