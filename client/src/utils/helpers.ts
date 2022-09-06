//? From RTK Docs on Type-safe Error handling:
//? https://redux-toolkit.js.org/rtk-query/usage-with-typescript#inline-error-handling-example
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

/**
 * Type predicate to narrow an unknown error to `FetchBaseQueryError`
 */
export function isFetchBaseQueryError(
	error: unknown
): error is FetchBaseQueryError {
	return typeof error === "object" && error != null && "status" in error;
}

/**
 * Type predicate to narrow an unknown error to an object with a string 'message' property
 */
export function isErrorWithMessage(
	error: unknown
): error is { message: string } {
	return (
		typeof error === "object" &&
		error != null &&
		"message" in error &&
		// eslint-disable-next-line
		typeof (error as any).message === "string"
	);
}

/**
 * Type predicate to narrow an unknown error to a `FetchBaseQueryError` with a `data` object containing a string 'message' property
 */
export function isFetchBaseQueryErrorWithMessage(
	error: unknown
): error is { data: { message: string } } {
	return isFetchBaseQueryError(error) && isErrorWithMessage(error.data);
}
