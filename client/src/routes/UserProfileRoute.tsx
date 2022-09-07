import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";

import WarbleListItem from "../components/WarbleListItem";

import { useGetAllUserWarblesQuery } from "../store/services/api";

import defaultProfileImage from "../assets/default-profile-image.jpg";

export default function UserProfileRoute() {
	const params = useParams();
	const navigate = useNavigate();

	const {
		data: userProfile,
		isLoading,
		error,
	} = useGetAllUserWarblesQuery(params.userId as string);

	return (
		<div className="flex flex-col items-center w-full">
			{isLoading ? <p>Loading...</p> : null}
			{userProfile ? (
				<>
					<img
						src={userProfile.profileImageUrl ?? defaultProfileImage}
						alt="Your profile photo"
						className="w-60 max-w-full aspect-square mb-2 border-4 border-base-content object-cover rounded-full"
					/>
					<p className="text-lg text-primary">@{userProfile.username}</p>
					<div className="p-6 flex flex-col flex-grow items-center gap-4 w-full">
						{userProfile.warbles.map((warble) => (
							<WarbleListItem
								key={warble.id}
								warble={{
									...warble,
									user: {
										username: userProfile.username,
										profileImageUrl: userProfile.profileImageUrl,
									},
								}}
							/>
						))}
					</div>
				</>
			) : null}
			{error ? (
				<div className="card card-compact bg-neutral shadow-xl hover:bg-neutral-focus sm:card-side sm:w-full">
					<div className="card-body">
						<p>Sorry, that user does not exist.</p>
						<div className="card-actions justify-center mt-3 sm:justify-start">
							<button
								onClick={() => navigate("/")}
								className="btn btn-primary normal-case"
							>
								Go home
							</button>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
}
