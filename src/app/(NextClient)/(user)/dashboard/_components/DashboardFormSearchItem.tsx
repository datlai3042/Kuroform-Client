import { FormCore } from "@/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TProps = {
	form: FormCore.Form;
};

const DashboardFormSearchItem = (props: TProps) => {
	const { form } = props;

	return (
		<Link
			href={`/form/${form._id}/share`}
			className=" hover:bg-color-main text-[#0bceb2] hover:text-[#fff]  p-[1rem]  w-full min-h-[3rem] flex items-center gap-[1rem]"
		>
			<Image
				src={"/assets/images/icon/logo/logo_home.png"}
				width={70}
				height={70}
				quality={100}
				alt="logo"
				className="w-[4rem] h-full object-contain"
				unoptimized={true}
			/>
			<p className="w-[90%] truncate font-bold text-[1.6rem]">{form?.form_title?.form_title_value}</p>
		</Link>
	);
};

export default DashboardFormSearchItem;
