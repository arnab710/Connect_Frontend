export interface userInfoFetch {
	result: "pass";
	userData: {
		_id: string;
		firstName: string;
		lastName: string;
		profilePicture: string;
		coverPicture: string;
		city: string;
		country: string;
		bio: string;
		occupation: string;
		followers: {
			user: string;
			_id: string;
		}[];
		followings: {
			user: string;
			_id: string;
		}[];
	};
	postNumber: number;
}
