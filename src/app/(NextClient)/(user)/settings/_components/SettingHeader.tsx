import React, { useContext } from "react";
import { ChevronRight, ChevronsRight, Flower, Search } from "lucide-react";
import { SidebarContext } from "../../dashboard/SidebarContext";
import { usePathname } from "next/navigation";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import LogoHome from "@/app/(NextClient)/_components/logo/LogoHome";
import ButtonDarkMode from "@/app/(NextClient)/_components/ui/button/ButtonDarkMode";

const SettingHeader = () => {
	const { openSidebar, setOpenSidebar } = useContext(SidebarContext);
	const pathName = usePathname();

	return (
		<div className="w-full h-[3rem] flex items-center justify-between gap-[1rem] text-[1.3rem]  text-text-theme">
			<div className="flex items-center gap-[.5rem] ">
				{!openSidebar && <ButtonIcon Icon={<ChevronsRight />} onClick={() => setOpenSidebar(true)} />}
				<LogoHome />
				<ChevronRight size={16} />
				<span className="first-letter:uppercase text-[1.4rem] font-medium">{pathName.replace("/", "")}</span>
			</div>
			<div className="flex gap-[20px] ">
				<div
					className="p-[.2rem_.8rem] flex items-center gap-[.8rem] hover:bg-slate-200 rounded-md"
					title="Tìm kiếm"
				>
					<Search className="w-[1.6rem]" />
					<span>Search</span>
				</div>
				<ButtonDarkMode />
			</div>
		</div>
	);
};

export default SettingHeader;
