"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import Auth from "../auth/auth";
import { useRouter } from "next/navigation";

const HomePage = () => {
	useEffect(() => {
		localStorage.setItem("isAuthentication", JSON.stringify(false));
	}, []);
	const router = useRouter();

	return (
		<div>
			HomePage
			<button
				onClick={async () => {
					const json = await fetch("/v1/api/auth/login", { method: "GET" });
					const result = (await json.json()) as { auth: boolean };
					if (result.auth) {
						console.log("OK");
						router.push("/dashboard");
					}
				}}
			>
				Login
			</button>
		</div>
	);
};

export default HomePage;
