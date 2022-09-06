import * as React from "react";

import WarbleListItem from "./WarbleListItem";

import { useGetAllWarblesQuery } from "../store/services/api";

export default function WarbleTimeline() {
	const { data: warbles } = useGetAllWarblesQuery();

	return (
		<div className="p-6 flex flex-col flex-grow items-center gap-4">
			{warbles
				? warbles.map((warble) => (
						<WarbleListItem key={warble.id} warble={warble} />
				  ))
				: null}
		</div>
	);
}
