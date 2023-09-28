import React from "react";
import style from "./EditProfileInputTag.module.css";
import { ActionUser } from "../../Reducers/userInfoReducer";

const EditProfileInputTag: React.FC<{ inputHead: string; value: string; dispatchFxn: React.Dispatch<ActionUser>; dispatchFxnName: string }> = ({ inputHead, value, dispatchFxn, dispatchFxnName }) => {
	return (
		<div className={style.wholeInputDiv}>
			<label htmlFor={dispatchFxnName} className={style.firstNameLabel}>
				{inputHead}
			</label>
			<div className={style.inputDiv}>
				<input id={dispatchFxnName} type="text" value={value} className={style.input} onChange={(e) => dispatchFxn({ type: dispatchFxnName, payload: e.target.value })} />
			</div>
		</div>
	);
};

export default EditProfileInputTag;
