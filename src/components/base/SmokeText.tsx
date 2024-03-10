import * as React from "react";
import { smokeString, addNoise, mapLatinRus } from "@/utils/smokeString";

export default ({ children }) => {
	children = smokeString(children, mapLatinRus, addNoise);

	return (
		<span
			dangerouslySetInnerHTML={{ __html: children }}
		/>
	)
};
