import * as React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { selectIsLoggedIn } from "../../store/auth/authSlice";

export default function useRequireLogin(redirectTo = "/signin") {
	const isLoggedIn = useSelector(selectIsLoggedIn);
	const navigate = useNavigate();

	React.useEffect(() => {
		if (!isLoggedIn) {
			navigate(redirectTo, { replace: true });
		}
	}, [isLoggedIn, navigate, redirectTo]);
}
