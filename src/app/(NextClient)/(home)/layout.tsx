import React from "react";

type TProps = {
	children: React.ReactNode;
};

const HomeLayout = (props: TProps) => {
	const { children } = props;

	return <div className=" w-full min-h-screen px-[16px] sm:px-[30px] xl:p-0 ">{children}</div>;
};

export default HomeLayout;
