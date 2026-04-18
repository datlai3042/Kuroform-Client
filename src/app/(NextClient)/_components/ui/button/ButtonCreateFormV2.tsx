"use client";

import React from "react";
import { ButtonCustomProps } from "./Button";
import { ButtonCustomNavigation } from "./ButtonNavigation";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import FormService from "@/app/_services/form.service";
import { useRouter } from "next/navigation";
import BoxLoading from "../BoxLoading";
import { Dock } from "lucide-react";

interface TProps extends ButtonCustomNavigation {
      icon?: React.ReactNode;
      position?: "LEFT" | "RIGHT";
      isNotRedirect?: boolean;
}

const ButtonCreateFormV2 = (props: TProps) => {
      const { textContent, urlNavigation, position = "LEFT", isNotRedirect = false, icon, ...AnchorProps } = props;

      const router = useRouter();
      const queryClient = useQueryClient();

      const createNewForm = useMutation({
            mutationKey: ["create-new-form"],
            mutationFn: () => FormService.createForm(),
            onSuccess: (dataResponse) => {
                  const { form_id } = dataResponse.metadata;
                  router.push(`/form/${form_id}/edit`);
                  queryClient.invalidateQueries({ queryKey: ["get-form-pagination"] });
            },
      });

      return (
            <Link
                  onClick={() => createNewForm.mutate()}
                  tabIndex={-1}
                  href={isNotRedirect ? "#" : urlNavigation}
                  {...AnchorProps}
                  className={`${AnchorProps.className} w-full h-[4rem]  p-[1rem_2rem] flex flex-col  justify-center items-center gap-[.8rem] text-[1.8rem] text-[#ffffff] opacity-[.95] hover:opacity-100 transition-colors duration-200 rounded-[.4rem]`}
            >
                  {icon && (
                        <div className="bg-color-main flex-1 w-full flex justify-center items-center rounded-md">
                              {createNewForm.isPending ? <BoxLoading /> : icon}
                        </div>
                  )}

                  <div className="p-[2rem] bg-[#fff] w-full text-color-main flex gap-[.5rem] justify-center items-center font-medium text-[1.4rem]  rounded-md">
                        <Dock size={20}/>
                        {textContent}
                  </div>
                  {}
            </Link>
      );
};

export default ButtonCreateFormV2;
