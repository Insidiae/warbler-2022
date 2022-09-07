import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { selectUser } from "../store/auth/authSlice";

import type { User } from "../store/auth/authSlice";

import defaultProfileImage from "../assets/default-profile-image.jpg";

export default function UserAside() {
	const user = useSelector(selectUser) as User;

	const { username, profileImageUrl, id } = user;

	return (
		<div className="hidden sticky top-4 self-start sm:flex flex-col items-center">
			<img
				src={profileImageUrl ?? defaultProfileImage}
				alt="Your profile photo"
				className="w-60 max-w-full aspect-square mb-2 border-4 border-base-content object-cover rounded-full"
			/>
			<Link to={`/${id}`} className="text-lg text-primary hover:underline">
				@{username}
			</Link>
		</div>
	);
}
