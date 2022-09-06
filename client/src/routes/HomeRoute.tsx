import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import UserAside from "../components/UserAside";
import WarbleTimeline from "../components/WarbleTimeline";

import { selectIsLoggedIn } from "../store/auth/authSlice";

import warblerHeroImage from "../assets/warbler-hero.jpg";

export default function HomeRoute() {
	const isLoggedIn = useSelector(selectIsLoggedIn);

	if (!isLoggedIn) {
		return (
			<div
				className="hero min-h-screen"
				style={{ backgroundImage: `url(${warblerHeroImage})` }}
			>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-center">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">What&apos;s Happening?</h1>
						<p className="mb-5 text-2xl font-bold">New to Warbler?</p>
						<Link to="/signup" className="btn btn-primary normal-case">
							Sign up here!
						</Link>
					</div>
				</div>
			</div>
		);
	}
	return (
		<div className="flex p-4">
			<UserAside />
			<WarbleTimeline />
		</div>
	);
}
