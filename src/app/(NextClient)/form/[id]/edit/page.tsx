"use client";
import React, { useContext, useEffect } from "react";
import HeaderEditForm from "./components/HeaderEditForm";
import FormCore from "./components/FormCore";
import FormEditContextProvider, { FormEditContext } from "@/app/(NextClient)/_components/provider/FormEditProvider";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { SidebarContext } from "@/app/(NextClient)/dashboard/SidebarContext";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import DashBoardLeft from "@/app/(NextClient)/dashboard/_components/layout/DashBoardLeft";
import { useQuery } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";

const EditFormPage = ({ params }: { params: { id: string } }) => {
	const { openSidebar } = useContext(SidebarContext);
	const { modeScreen } = useContext(FormModeScreenContext);
	const { setFormInitial } = useContext(FormEditContext);

	const getFormQuery = useQuery({
		queryKey: ["get-form", params.id],
		queryFn: () => FormService.getForm({ form_id: params.id }),
	});

	useEffect(() => {
		if (getFormQuery.isSuccess) {
			const { form } = getFormQuery.data.metadata;
			console.log(form);
			setFormInitial(form);
		}
	}, [getFormQuery.isSuccess, params.id, getFormQuery.data, setFormInitial]);

	console.log({ layout: modeScreen });

	const styleEffect = {
		onCheckSidebar: (check: boolean) => {
			if (check)
				return "w-full sm:w-[65%] xl:w-[83.5%] left-0 sm:left-[35%] xl:left-[16.5%] right-0 duration-[300ms]";
			return "w-full inset-0 duration-[600ms]";
		},
		onCheckModeScreen: () => {
			if (modeScreen === "FULL")
				return " !min-h-screen !w-screen  !h-max fixed !overflow-hidden !top-0 !left-0 !duration-1000 !transition-[scale] animate-modeScreen z-[50]";
			return "";
		},
	};
	return (
		<DivNative className="relative w-screen  min-h-screen h-max flex overflow-x-hidden ">
			{openSidebar && (
				<aside
					className={` absolute z-[2] w-[0%] sm:w-[35%] xl:w-[16.5%] min-h-full h-max border-r-[.1rem]  border-b-[.1rem] border-slate-200 hidden sm:block transition-[width]  duration-1000  bg-[#ffffff] `}
				>
					{openSidebar && <DashBoardLeft />}
				</aside>
			)}
			<DivNative
				className={`${styleEffect.onCheckSidebar(
					openSidebar
				)} ${styleEffect.onCheckModeScreen()} absolute  h-full  transition-all    `}
			>
				<DivNative className=" min-h-screen  h-max  flex flex-col text-[1.4rem] bg-[#ffffff] max-w-full overflow-hidden">
					<HeaderEditForm />
					<FormCore />
				</DivNative>
			</DivNative>
		</DivNative>
		// <TitleFormContextProvider>

		// </TitleFormContextProvider>
	);
};

export default EditFormPage;