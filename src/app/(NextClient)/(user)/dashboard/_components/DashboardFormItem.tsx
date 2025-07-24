import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { generateContentToFormState } from "@/app/_lib/utils";
import { FormCore } from "@/type";
import moment from "moment";
import Link from "next/link";
import React from "react";
import DashboardFormAction from "./DashboardFormAction";
import Image from "next/image";
import { Eye, Pencil, View } from "lucide-react";
import { calcPercentForm } from "@/app/utils/form.utils";
import FormStateProvider from "@/app/(NextClient)/_components/ui/form/form-state/FormStateProvider";

type TProps = {
      form: FormCore.Form;
};

const DashboardFormItem = (props: TProps) => {
      const { form } = props;

      if (!form) return null;

      return (
            <Link
                  prefetch={false}
                  href={`/form/${form._id}/summary`}
                  key={form._id}
                  className=" h-[30rem] text-[1.3rem]  w-full  max-w-full flex flex-col rounded-[1.6rem]    gap-[1.4rem]   text-text-theme bg-[var(--bg-form-nav)]  border-[.1rem] border-[var(--border-form-item)]"
            >
                  {/* <FormStateProvider form_state={form.form_state} /> */}
                  <div className="w-full flex flex-col items-center justify-center gap-[3rem]">
                        <div className="w-full h-[18rem]">
                              {form.form_avatar?.form_avatar_url ? (
                                    <Image
                                          src={form.form_avatar.form_avatar_url}
                                          width={20}
                                          height={20}
                                          alt="avatar"
                                          unoptimized={true}
                                          className="w-full h-full  object-cover rounded-tl-[1.6rem] rounded-tr-[1.6rem]"
                                    />
                              ) : (
                                    <div className="w-full h-full  bg-[var(--form-empty-image)] rounded-tl-[1.6rem] rounded-tr-[1.6rem]"> </div>
                              )}
                        </div>
                  </div>
                  <div className="w-full  flex flex-col justify-center gap-[1rem] p-[0rem_1rem]">
                        <div className=" flex flex-col justify-center gap-[1.2rem] ">
                              <div
                                    dangerouslySetInnerHTML={{ __html: form?.form_title?.form_title_value || "Trống" }}
                                    className="max-w-[90%] h-[2.4rem] reset-editor truncate text-[1.6rem] text-color-main font-bold"
                              ></div>
                              <span>Chỉnh sửa {moment(new Date(form.updatedAt!)).fromNow()}</span>
                        </div>
                        <DivNative className="flex flex-col xl:flex-row flex-wrap  xl:items-center text-[1.2rem] gap-[2rem]">
                              {/* <div className="order-2 xl:order-1">
                                    <DashboardFormAction form_id={form._id} />
                              </div> */}
                              <div className="flex gap-[2rem]  ">
                                    <p className="flex gap-[1rem] items-center">
                                          <Eye size={16} />
                                          <span>{form.form_views || 0}</span>
                                    </p>
                                    <p className="flex gap-[1rem] items-center">
                                          <Pencil size={16} />
                                          <span>{form.form_response || 0}</span>
                                    </p>
                                    Tỉ lệ: {calcPercentForm({ formAnswer: form.form_response, formView: form.form_views })}%
                              </div>
                        </DivNative>
                  </div>
            </Link>
      );
};

export default DashboardFormItem;
