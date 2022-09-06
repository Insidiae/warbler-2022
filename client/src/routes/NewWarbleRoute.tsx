import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectIsLoggedIn, selectUserId } from "../store/auth/authSlice";
import { useCreateWarbleMutation } from "../store/services/api";
import { isFetchBaseQueryErrorWithMessage } from "../utils/helpers";

type WarbleFormInputs = {
	warble: { value: string };
};

export default function NewWarbleRoute() {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!isLoggedIn) {
			navigate("/signin", { replace: true });
		}
	}, [isLoggedIn, navigate]);

	const userId = useSelector(selectUserId) as string;
	const [createWarble, { error, status }] = useCreateWarbleMutation();

	React.useEffect(() => {
		if (status === "fulfilled") {
			navigate("/", { replace: true });
		}
	}, [status, navigate]);

	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		try {
			event.preventDefault();
			const target = event.target as typeof event.target & WarbleFormInputs;

			await createWarble({
				userId,
				formData: {
					warble: target.warble.value,
				},
			});
		} catch {
			//? errors are already handled by our mutation hook!
		}
	}

	return (
		<div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
			<div className="w-full max-w-md space-y-8">
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-2 rounded-md shadow-sm">
						<div>
							<label htmlFor="warble" className="sr-only">
								Email address
							</label>
							<textarea
								id="warble"
								name="warble"
								required
								className="textarea textarea-bordered w-full h-24"
								placeholder="New Warble..."
							/>
						</div>
					</div>

					{isFetchBaseQueryErrorWithMessage(error) ? (
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
								<span>{error.data.message}</span>
							</div>
						</div>
					) : null}

					<div>
						<button
							type="submit"
							className={`btn btn-primary w-full normal-case ${
								status === "pending" ? "loading" : ""
							}`}
						>
							Post Warble
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
