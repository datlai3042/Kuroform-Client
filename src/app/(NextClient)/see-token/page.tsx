import React from "react";
import ButtonNavigation from "../_components/ui/button/ButtonNavigation";
import { cookies } from "next/headers";

const SeeToken = () => {
	// const { access_token } = props;
	const cookieStore = cookies();
	const access_token = cookieStore.get("access_token")?.value || "";

	return (
		<div>
			<p className="w-[360px] break-words">SeeToken - {access_token}</p>
			<ButtonNavigation urlNavigation="/dashboard" textContent="Dashboard" onClick={() => {}} />
		</div>
	);
};

export default SeeToken;
