"use client";
import Link from "next/link";
import React from "react";

type TProps = {
	Url: string;
};

const ButtonNavigation = (props: TProps) => {
	const { Url } = props;

	return <Link href={Url}>{Url}</Link>;
};

export default ButtonNavigation;
