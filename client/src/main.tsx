import React from "react";
import ReactDOM from "react-dom/client";

import { AppProviders } from "./components/AppProviders";
import App from "./App";

import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AppProviders>
			<App />
		</AppProviders>
	</React.StrictMode>
);
