import { Action, IUserType } from "./signupUserType";

interface propType {
	inputName: string;
	placeholderName: string;
	inputType: string;
	iconType: string;
	valueType?: keyof IUserType;
	dispatchType?: string;
	styleClass?: string;
	stateValue?: string;
	isLoginInput?: true;
	dispatchfxn?: React.Dispatch<Action>;
}

interface iconType {
	email: React.ReactElement;
	password: React.ReactElement;
	user: React.ReactElement;
	country: React.ReactElement;
	city: React.ReactElement;
	profession: React.ReactElement;
}

export type { propType, iconType };
