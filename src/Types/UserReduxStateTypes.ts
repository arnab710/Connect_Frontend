interface userInfo {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	country: string;
	city: string;
	occupation: string;
	bio: string;
	profilePicture: string;
	coverPicture: string;
	followings: { user: string; _id: string }[];
	followers: { user: string; _id: string }[];
	createdAt: string;
}

interface payloadType {
	firstName?: string;
	lastName?: string;
	country?: string;
	city?: string;
	occupation?: string;
	bio?: string;
	profilePicture?: string;
	coverPicture?: string;
}

type followingPayloadType = { user: string; _id: string }[];

type followersPayloadType = { user: string; _id: string }[];

export type { userInfo, payloadType, followingPayloadType, followersPayloadType };
