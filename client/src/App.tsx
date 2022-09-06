import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomeRoute from "./routes/HomeRoute";
import AuthForm from "./components/AuthForm";
import NewWarbleRoute from "./routes/NewWarbleRoute";
import WarbleRoute from "./routes/WarbleRoute";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route index element={<HomeRoute />} />
				<Route
					path="signin"
					element={
						<AuthForm
							key="signin"
							heading="Welcome Back."
							buttonText="Log in"
						/>
					}
				/>
				<Route
					path="signup"
					element={
						<AuthForm
							key="signup"
							isSignUp
							heading="Join Warbler Today!"
							buttonText="Sign Me Up!"
						/>
					}
				/>
				<Route path="new-warble" element={<NewWarbleRoute />} />
				<Route path=":userId">
					<Route path="warbles/:warbleId" element={<WarbleRoute />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;
