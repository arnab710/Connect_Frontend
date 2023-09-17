import { Action, IUserContext } from "../Types/signupUserType";

export const handleChange = (
	e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
	val: IUserContext | null,
	dispatchType: string | undefined,
	loginDispatch: React.Dispatch<Action> | undefined,
	isLoginInput: boolean | undefined
) => {
	if (dispatchType && !isLoginInput && val) val.dispatch({ type: dispatchType, payload: e.target.value });
	else if (isLoginInput && dispatchType && loginDispatch) loginDispatch({ type: dispatchType, payload: e.target.value });
};
