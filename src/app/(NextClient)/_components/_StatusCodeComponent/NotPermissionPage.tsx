import Image from "next/image";
import React from "react";

type TProps = {
	message?: string;
};

const NotPermissionPage = (props: TProps) => {
	const { message = "Nội dung truy cập không được phép" } = props;

	return (
		<div className="relative inset-0 max-w-screen h-screen  flex flex-col gap-[2rem] justify-center items-center ">
			<Image
				src={"/assets/images/icon/errors/403.png"}
				width={181}
				height={12}
				className="hidden xl:inline"
				alt="highlight-text"
			/>
			<p className="font-bold text-[3rem] text-[#0bceb2]">{message}</p>
		</div>
	);
};

export default NotPermissionPage;
