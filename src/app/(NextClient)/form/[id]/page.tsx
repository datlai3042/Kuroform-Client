// "use client";
import FormService from "@/app/_services/form.service";
import React, { cache } from "react";
import Image from "next/image";
import { FormCore } from "@/type";
import RenderInputAnswers from "./_components/RenderInputAnswers";
import { Metadata } from "next";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import FormAnswerProvider from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import StatusCodeResponse from "@/app/(NextClient)/_components/_StatusCodeComponent/StatusCodeResponse";
import NotFoundPage from "../../_components/_StatusCodeComponent/NotFoundPage";
import FormAnswerHeader from "./_components/FormAnswerHeader";
import { stringToSlug } from "@/app/_lib/utils";
import FormAnswerEmpty from "./_components/InputAnswer/FormAnswerEmpty";
import AuthorDat from "../../_components/author/AuthorDat";
import FormAnswerCore from "./_components/FormAnswerCore";

const getFormCache = cache(FormService.getFormGuess);

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
      const form_id = params.id;

      const res = await getFormCache({ form_id, options: { cache: "no-store" } });
      const { form } = res.metadata;

      const iconForm = form?.form_avatar?.form_avatar_url || form?.form_setting_default.form_avatar_default_url;
      const title = form?.form_title.form_title_value || "Form không có tiêu đề";

      return {
            title: title || "Không tìm thấy thông tin",
            icons: {
                  icon: iconForm,
            },
            alternates: {
                  canonical: "/",
            },
            openGraph: {
                  type: "website",
                  locale: "vi",
                  title: title,
                  siteName: "Một cách để tạo Form nhanh chóng",
                  url: process.env.NEXT_PUBLIC_CLIENT_URL + "/form/" + form?._id,
                  images: [{ url: iconForm }],
            },
      };
}

const FormPage = async ({ params }: { params: { id: string } }) => {
      const getFormQuery = await getFormCache({ form_id: params.id, options: { cache: "no-store" } });
      const formCore = getFormQuery.metadata.form;
      const form_answer_id = getFormQuery.metadata.form_answer_id;

      if (!formCore)
            return (
                  <div className="w-screen h-screen flex items-center justify-center">
                        <NotFoundPage />
                  </div>
            );

    

            const formColor = formCore.form_color ||  "#f2f2f2" 

      return (
            <div
                  style={{ backgroundColor: formColor }}
                  className="px-[2rem] xl:px-0 w-full  min-h-screen h-max flex justify-center  p-[2rem_2rem_4rem_2rem]  "
            >
                  {/* {formCore.form_inputs.length === 0 && !formCore.form_title.form_title_value && <FormAnswerEmpty />} */}
                  {/* {(formCore.form_inputs.length > 0 || formCore.form_title.form_title_value) && ( */}
                  <FormAnswerCore formCore={formCore} form_answer_id={form_answer_id} />
                  {/* )} */}
            </div>
      );
};

export default FormPage;
