import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useSigninMutation, useSignupMutation } from "../store/services/api";
import { selectIsLoggedIn, setCredentials } from "../store/auth/authSlice";

import type { UserResponse } from "../store/services/api";

import { isFetchBaseQueryErrorWithMessage } from "../utils/helpers";

import warblerLogo from "../assets/warbler-logo.png";

type AuthFormProps = {
	buttonText: string;
	heading: string;
	isSignUp?: boolean;
};

type AuthFormState = {
	email: string;
	password: string;
	username: string;
	profileImageUrl: string;
};

const initialState = {
	email: "",
	password: "",
	username: "",
	profileImageUrl: "",
};

type AuthFormPayload = {
	name: keyof AuthFormState;
	value: string;
};

function authFormReducer(
	state: AuthFormState,
	{ name, value }: AuthFormPayload
) {
	return { ...state, [name]: value };
}

export default function AuthForm({
	buttonText,
	heading,
	isSignUp,
}: AuthFormProps) {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (isLoggedIn) {
			navigate("/", { replace: true });
		}
	}, [isLoggedIn, navigate]);

	const [form, setForm] = React.useReducer(authFormReducer, initialState);

	const dispatch = useDispatch();

	const [signin, { status: signinStatus, error: signinError }] =
		useSigninMutation();
	const [signup, { status: signupStatus, error: signupError }] =
		useSignupMutation();

	function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
		setForm({
			name: event.target.name as keyof AuthFormState,
			value: event.target.value,
		});
	}

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		try {
			event.preventDefault();

			let res: UserResponse;
			if (isSignUp) {
				res = await signup(form).unwrap();
			} else {
				res = await signin(form).unwrap();
			}

			dispatch(
				setCredentials({
					user: {
						id: res.userId,
						username: res.username,
						profileImageUrl: res.profileImageUrl,
					},
					token: res.access_token,
				})
			);
		} catch {
			//? Auth rejection is handled via the `useMutation()` hook
		}
	}

	return (
		<div>
			<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
				<div className="w-full max-w-md space-y-8">
					<div>
						<img
							className="mx-auto h-12 w-auto"
							src={warblerLogo}
							alt="Warbler Logo"
						/>
						<h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
							{heading}
						</h2>
					</div>
					<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
						<div className="space-y-2 rounded-md shadow-sm">
							<div>
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									name="email"
									type="email"
									value={form.email}
									onChange={handleChange}
									autoComplete="email"
									required
									className="input input-bordered w-full"
									placeholder="Email address"
								/>
							</div>
							<div>
								<label htmlFor="password" className="sr-only">
									Password
								</label>
								<input
									id="password"
									name="password"
									type="password"
									value={form.password}
									onChange={handleChange}
									autoComplete="current-password"
									required
									className="input input-bordered w-full"
									placeholder="Password"
								/>
							</div>

							{isSignUp ? (
								<>
									<div>
										<label htmlFor="username" className="sr-only">
											Username
										</label>
										<input
											id="username"
											name="username"
											type="text"
											value={form.username}
											onChange={handleChange}
											required
											className="input input-bordered w-full"
											placeholder="Username"
										/>
									</div>
									<div>
										<label htmlFor="profile-image-url" className="sr-only">
											Profile Image URL
										</label>
										<input
											id="profile-image-url"
											name="profileImageUrl"
											type="url"
											value={form.profileImageUrl}
											onChange={handleChange}
											className="input input-bordered w-full"
											placeholder="Profile Image URL"
										/>
									</div>
								</>
							) : null}
						</div>

						{signinStatus === "rejected" || signupStatus === "rejected" ? (
							<div className="alert alert-error shadow-lg">
								<div>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="stroke-current flex-shrink-0 h-6 w-6"
										fill="none"
										viewBox="0 0 24 24"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
										/>
									</svg>
									{isFetchBaseQueryErrorWithMessage(signinError) ? (
										<span>{signinError.data.message}</span>
									) : null}
									{isFetchBaseQueryErrorWithMessage(signupError) ? (
										<span>{signupError.data.message}</span>
									) : null}
								</div>
							</div>
						) : null}

						<div>
							<button type="submit" className="btn btn-primary w-full">
								{buttonText}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
