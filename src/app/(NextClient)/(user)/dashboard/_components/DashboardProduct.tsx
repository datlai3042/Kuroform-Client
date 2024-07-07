"use client";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import { Bell, LayoutPanelTop, LayoutTemplate, Map, SmilePlus, Sparkles, Store, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";

const WorkItem = [
	{ Title: "Tempaltes", Icon: <LayoutPanelTop className="w-[1.8rem]" />, Href: "#" },
	{
		Title: "Quản lí thông báo",
		Icon: (
			<Image
				src={"/assets/images/icon/notification_control.png"}
				width={18}
				height={18}
				alt="icon"
				className="w-[1.8rem]"
			/>
		),
		Href: "/notification",
	},
	{ Title: "Roadmap", Icon: <Map className="w-[1.8rem]" />, Href: "#" },
	{ Title: "Feedback", Icon: <SmilePlus className="w-[1.8rem]" />, Href: "#" },
	{ Title: "Thùng rác", Icon: <Trash2 className="w-[1.8rem]" />, Href: "/trash" },
];

const DashboardProduct = () => {
	const { theme } = useContext(ThemeContext);

	const pathName = usePathname();

	const colorTheme = theme === "light" ? "text-text-theme hover:text-[#fff]" : "!text-text-theme ";

	return (
		<div className={` flex flex-col gap-[.6rem] text-text-theme `}>
			<p className="pl-[.6rem] text-[1.2rem] ">Các đường dẫn khác</p>

			<Link
				href={"/"}
				className={`nav ${colorTheme} ${pathName === "/templates" ? "nav__isActive" : "nav__normal "}  `}
			>
				<LayoutTemplate size={18} />
				<span className="font-medium ">Thư viện form</span>
			</Link>

			<Link
				href={"/notification"}
				className={`nav ${colorTheme} ${pathName === "/notification" ? "nav__isActive" : "nav__normal "}  `}
			>
				<Store size={18} />
				<span className="font-medium ">Kho của bạn</span>
			</Link>

			<Link
				href={"/notification"}
				className={`nav ${colorTheme} ${pathName === "/notification" ? "nav__isActive" : "nav__normal "}  `}
			>
				<Bell size={18} />
				<span className="font-medium ">Quản lí thông báo</span>
			</Link>

			<Link
				href={"/trash"}
				className={`nav ${colorTheme} ${
					pathName === "/trash" ? "nav__isActive" : "nav__normal !text-text-theme"
				}  `}
			>
				<Trash2 />
				<span className="font-medium ">Thùng rác</span>
			</Link>
		</div>
	);
};

export default DashboardProduct;
