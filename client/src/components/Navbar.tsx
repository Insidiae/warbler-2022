import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { selectIsLoggedIn, clearCredentials } from "../store/auth/authSlice";

import warblerLogo from "../assets/warbler-logo.png";

export default function Navbar() {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const dispatch = useDispatch();

	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<Link to="/" className="btn btn-link capitalize text-xl">
					<img src={warblerLogo} alt="Warbler Logo" className="w-6" />
				</Link>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal p-0 capitalize font-bold">
					{isLoggedIn ? (
						<li>
							<button onClick={() => dispatch(clearCredentials())}>
								Sign Out
							</button>
						</li>
					) : (
						<>
							<li>
								<Link to="/signin">Sign In</Link>
							</li>
							<li>
								<Link to="/signup">Sign Up</Link>
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
}
