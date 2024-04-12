import { UserType } from "@/app/_schema/user/user.schema";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
	user?: UserType | null;
};

const initialState: InitialState = {
	user: null,
};

const authenticationSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {
		onLoginUser: (state, payload: PayloadAction<{ user: UserType }>) => {
			state.user = payload.payload.user;
		},

		onLogout: (state) => {
			state.user = null;
		},
	},
});

export const { onLoginUser, onLogout } = authenticationSlice.actions;
export default authenticationSlice.reducer;
