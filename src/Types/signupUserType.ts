interface IUserType {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	country: string;
	city: string;
	occupation: string;
	bio: string;
	confirmPassword: string;
}
type Action = {
	type: string;
	payload?: string;
};
interface IUserContext {
	userInfo: IUserType;
	dispatch: React.Dispatch<Action>;
}

export type { IUserType, Action, IUserContext };
