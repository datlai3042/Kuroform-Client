import React from "react";
import ButtonNavigation from "../_components/ui/button/ButtonNavigation";
import { cookies } from "next/headers";

type TProps = {
	access_token: string;
};

const SeeToken = (props: TProps) => {
	// const { access_token } = props;
	const cookieStore = cookies();
	const access_token = cookieStore.get("access_token")?.value || "";

	return (
		<div>
			<p className="w-[360px] break-words">SeeToken - {access_token}</p>
			<ButtonNavigation Url="/dashboard" />
		</div>
	);
};

export default SeeToken;
