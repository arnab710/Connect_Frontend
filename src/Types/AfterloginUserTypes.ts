type userInfoObj = {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	profilePicture: string;
	coverPicture: string;
	city: string;
	country: string;
	bio: string;
	occupation: string;
	followers: { user: string; _id?: string }[];
	followings: { user: string; _id?: string }[];
	createdAt: string;
	updatedAt: string;
};

interface loggedInUserType {
	result: "pass";
	message: string;
	token: string;
	user: userInfoObj;
}

export type { loggedInUserType, userInfoObj };
