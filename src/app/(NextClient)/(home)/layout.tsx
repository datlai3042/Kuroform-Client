import React from "react";
import CheckPathName from "../_components/CheckPathName";

type TProps = {
	children: React.ReactNode;
};

const HomeLayout = (props: TProps) => {
	const { children } = props;

	return <div className=" w-full min-h-screen">{children}</div>;
};

export default HomeLayout;
