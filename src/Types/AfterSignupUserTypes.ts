type newUserType = {
	firstName: string;
	lastName: string;
	email: string;
	profilePicture: string;
	coverPicture: string;
	city: string;
	country: string;
	bio: string;
	occupation: string;
	_id: string;
	followers: { user: string; _id: string }[];
	followings: { user: string; _id: string }[];
	createdAt: string;
	updatedAt: string;
};

interface AfterSignupUserType {
	result: "pass";
	message: string;
	newUser: newUserType;
	jwtToken: string;
}

export type { AfterSignupUserType };
