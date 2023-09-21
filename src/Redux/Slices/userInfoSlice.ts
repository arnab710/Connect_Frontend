import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { followersPayloadType, followingPayloadType, payloadType, userInfo } from "../../Types/UserReduxStateTypes";

const initialState: userInfo = {
	_id: "",
	firstName: "",
	lastName: "",
	email: "",
	country: "",
	city: "",
	occupation: "",
	bio: "",
	profilePicture: "",
	coverPicture: "",
	followers: [],
	followings: [],
	createdAt: "",
};

export const userSlice = createSlice({
	name: "User",
	initialState,
	reducers: {
		updateUserInfo: (state, action: PayloadAction<payloadType>) => {
			const payloadObj = Object.keys(action.payload) as (keyof payloadType)[];
			payloadObj.forEach((key) => {
				const val = action.payload[key];
				if (val !== undefined && typeof val === "string") state[key] = val;
			});
		},
		updateUserFollowings: (state, action: PayloadAction<followersPayloadType>) => {
			state.followings = action.payload;
		},
		updateUserFollowers: (state, action: PayloadAction<followingPayloadType>) => {
			state.followers = action.payload;
		},
		deleteUserInfo: (state) => {
			state._id = "";
			state.firstName = "";
			state.lastName = "";
			state.profilePicture = "";
			state.coverPicture = "";
			state.bio = "";
			state.city = "";
			state.country = "";
			state.email = "";
			state.occupation = "";
			state.followers = [];
			state.followings = [];
			state.createdAt = "";
		},
	},
});

export const { updateUserInfo, deleteUserInfo, updateUserFollowers, updateUserFollowings } = userSlice.actions;
export default userSlice.reducer;
