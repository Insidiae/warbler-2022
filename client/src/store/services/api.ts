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

type CreateWarbleRequest = {
	userId: string;
	formData: {
		warble: string;
	};
};

export type Warble = {
	id: string;
	createdAt: string;
	warble: string;
	userId: string;
	user: {
		username: string;
		profileImageUrl: string | null;
	};
};

export type UserProfile = {
	username: string;
	profileImageUrl: string | null;
	warbles: Omit<Warble, "user">[];
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
	tagTypes: ["Warble"],
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
		getAllUserWarbles: builder.query<UserProfile, string>({
			query: (userId) => ({ url: `users/${userId}/warbles` }),
			providesTags: (result) =>
				result
					? [
							...result.warbles.map(({ id }) => ({
								type: "Warble" as const,
								id,
							})),
							"Warble",
					  ]
					: ["Warble"],
		}),
		getAllWarbles: builder.query<Warble[], void>({
			query: () => ({
				url: `warbles`,
			}),
			providesTags: (result) =>
				result
					? [
							...result.map(({ id }) => ({ type: "Warble" as const, id })),
							"Warble",
					  ]
					: ["Warble"],
		}),
		getWarble: builder.query<Warble, { userId: string; warbleId: string }>({
			query: ({ userId, warbleId }) => ({
				url: `users/${userId}/warbles/${warbleId}`,
			}),
		}),
		createWarble: builder.mutation<Warble, CreateWarbleRequest>({
			query: (req) => ({
				url: `users/${req.userId}/warbles`,
				method: "POST",
				body: req.formData,
			}),
			invalidatesTags: ["Warble"],
		}),
		deleteWarble: builder.mutation<
			Warble,
			{ userId: string; warbleId: string }
		>({
			query: ({ userId, warbleId }) => ({
				url: `users/${userId}/warbles/${warbleId}`,
				method: "DELETE",
			}),
			invalidatesTags: (result) =>
				result
					? [{ type: "Warble" as const, id: result.id }, "Warble"]
					: ["Warble"],
		}),
	}),
});

export const {
	useSigninMutation,
	useSignupMutation,
	useGetAllUserWarblesQuery,
	useGetAllWarblesQuery,
	useGetWarbleQuery,
	useCreateWarbleMutation,
	useDeleteWarbleMutation,
} = api;
