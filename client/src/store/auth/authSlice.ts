import { createSlice, PayloadAction, createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type User = {
	id: string;
	username: string;
	profileImageUrl: string | null;
};

type AuthState = {
	user: User | null;
	token: string | null;
};

const initialState: AuthState = {
	user: null,
	token: null,
};

const authSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setCredentials: (
			state,
			action: PayloadAction<{ user: User; token: string }>
		) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		clearCredentials: (state) => {
			state.user = null;
			state.token = null;
		},
	},
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export const selectAuthSlice = (state: RootState) => state.auth;

export const selectIsLoggedIn = createSelector(
	selectAuthSlice,
	(auth) => !!auth.token
);

export const selectUser = createSelector(selectAuthSlice, (auth) => auth.user);

export const selectUserId = createSelector(selectUser, (user) => user?.id);

export default authSlice.reducer;
