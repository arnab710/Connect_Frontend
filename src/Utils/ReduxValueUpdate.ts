import { userInfoObj } from "../Types/AfterloginUserTypes";
import { payloadType } from "../Types/UserReduxStateTypes";

export const updateUserValue = (data: userInfoObj): payloadType => {
	const keyObj = Object.keys(data);

	const payloadObj: payloadType = {};

	keyObj.forEach((val) => {
		const value = data[val as keyof userInfoObj];
		if (typeof value === "string" && val !== "updatedAt") payloadObj[val as keyof payloadType] = value;
	});
	return payloadObj;
};
