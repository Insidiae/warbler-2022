import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";

import { useDeleteWarbleMutation } from "../store/services/api";
import { selectUserId } from "../store/auth/authSlice";

import type { Warble } from "../store/services/api";

import defaultProfileImage from "../assets/default-profile-image.jpg";

export default function WarbleListItem({ warble }: { warble: Warble }) {
	const userId = useSelector(selectUserId);

	const [deleteWarble, { isLoading }] = useDeleteWarbleMutation();

	return (
		<div className="card card-compact bg-neutral shadow-xl hover:bg-neutral-focus sm:card-side w-full">
			<Link to={`/${warble.userId}`}>
				<figure className="p-3">
					<img
						src={warble.user.profileImageUrl || defaultProfileImage}
						alt={`${warble.user.username}'s profile photo`}
						className="w-24 h-24 object-cover rounded-full sm:w-16 sm:h-16"
					/>
				</figure>
			</Link>
			<div className="card-body">
				<div className="flex flex-col text-center sm:text-left">
					<span>
						<Link
							to={`/${warble.userId}`}
							className="text-primary mr-2 hover:underline"
						>
							@{warble.user.username}
						</Link>
						<Link
							to={`/${warble.userId}/warbles/${warble.id}`}
							className="hover:underline"
						>
							<time>{moment(warble.createdAt).format("Do MMM YYYY")}</time>
						</Link>
					</span>
					<p>{warble.warble}</p>
					{warble.userId === userId ? (
						<div className="card-actions justify-center mt-3 sm:justify-start">
							<button
								onClick={() => deleteWarble({ userId, warbleId: warble.id })}
								className={`btn btn-error ${isLoading ? "loading" : ""}`}
							>
								{!isLoading ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={1.5}
										stroke="currentColor"
										className="w-6 h-6 -ml-1 mr-1"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
										/>
									</svg>
								) : null}
								Delete
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}
