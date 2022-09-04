import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import type { RootState } from "../store";

export type UserResponse = {
	userId: string;
	username: string;
	profileImageUrl: string | null;
	access_token: string;
};

type SigninRequest = {
	email: string;
	password: string;
};

type SignupRequest = {
	email: string;
	password: string;
	username: string;
	profileImageUrl?: string;
};

type Warble = {
	id: string;
	createdAt: string;
	warble: string;
	userId: string;
	user?: {
		username: string;
		profileImageUrl: string | null;
	};
};

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: import.meta.env.VITE_API_ENDPOINT_URL,
		prepareHeaders: (headers, { getState }) => {
			// By default, if we have a token in the store, let's use that for authenticated requests
			const token = (getState() as RootState).auth.token;
			if (token) {
				headers.set("authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	reducerPath: "warblerApi",
	endpoints: (builder) => ({
		signin: builder.mutation<UserResponse, SigninRequest>({
			query: (credentials) => ({
				url: "auth/signin",
				method: "POST",
				body: credentials,
			}),
		}),
		signup: builder.mutation<UserResponse, SignupRequest>({
			query: (credentials) => ({
				url: "auth/signup",
				method: "POST",
				body: credentials,
			}),
		}),
		getAllUserWarbles: builder.query<Warble[], string>({
			query: (userId) => ({ url: `users/${userId}/warbles` }),
		}),
		getAllWarbles: builder.query<Warble[], void>({
			query: () => ({
				url: `warbles`,
			}),
		}),
	}),
});

export const {
	useSigninMutation,
	useSignupMutation,
	useGetAllUserWarblesQuery,
	useGetAllWarblesQuery,
} = api;
