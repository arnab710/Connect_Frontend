export interface followingUserType {
	_id: string;
	firstName: string;
	lastName: string;
	occupation: string;
	profilePicture: string;
}

export interface userFollowings {
	result: "pass";
	followings: {
		user: followingUserType;
		_id: string;
	}[];
}
