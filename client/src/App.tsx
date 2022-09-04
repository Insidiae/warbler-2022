import * as React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomeRoute from "./routes/HomeRoute";
import AuthForm from "./components/AuthForm";

function App() {
	return (
		<>
			<Navbar />
			<Routes>
				<Route index element={<HomeRoute />} />
				<Route
					path="/signin"
					element={<AuthForm heading="Welcome Back." buttonText="Log in" />}
				/>
				<Route
					path="/signup"
					element={
						<AuthForm
							isSignUp
							heading="Join Warbler Today!"
							buttonText="Sign Me Up!"
						/>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
