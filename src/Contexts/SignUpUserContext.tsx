import { createContext, useReducer } from "react";
import { Action, IUserContext, IUserType } from "../Types/signupUserType";
import { signupReducer } from "../Reducers/SignUpReducer";
import { initialState } from "../Utils/SignUpUserInitialState";

export const UserContext = createContext<IUserContext | null>(null);

interface IChildren {
	children: React.ReactNode;
}

const UserContextProvider: React.FC<IChildren> = ({ children }) => {
	const [userInfo, dispatch] = useReducer(signupReducer, initialState) as [IUserType, React.Dispatch<Action>];

	return <UserContext.Provider value={{ userInfo, dispatch }}>{children}</UserContext.Provider>;
};

export default UserContextProvider;
