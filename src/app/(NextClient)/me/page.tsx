import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export let check = false;

class Authentication {
	private _check = false;

	set check(value: boolean) {
		this._check = value;
	}

	get check() {
		return this._check;
	}
}

export const authentication = new Authentication();

const ProfileMe = () => {
	const _cookies = cookies().get("isAuthentication");

	// console.log("run", authentication.check);
	if (!false) redirect("/login");

	return <div>ProfileMe</div>;
};

export default ProfileMe;
