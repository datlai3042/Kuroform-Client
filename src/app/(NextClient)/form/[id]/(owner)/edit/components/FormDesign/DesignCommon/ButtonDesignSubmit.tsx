import { FormDesignContext } from "@/app/(NextClient)/_components/provider/FormDesignProvider";
import BoxLoading from "@/app/(NextClient)/_components/ui/BoxLoading";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import SelectColor from "@/app/(NextClient)/_components/ui/SelectColor";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { RootState } from "@/app/_lib/redux/store";
import { addOneToastError } from "@/app/_lib/redux/toast.slice";
import useUpdateForm from "@/app/hooks/useUpdateForm";
import { renderColorFromFormThemes, renderFormThemes } from "@/app/utils/form.utils";
import { FormCore } from "@/type";
import { Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 } from "uuid";

const ButtonDesignSubmit = () => {
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

      const formCoreBackUp = useSelector((state: RootState) => state.form.formCoreBackUp);

      const [labelTextSubmit, setLabelTextSubmit] = useState<string>(formCore.form_button_text || "1");
      const dispatch = useDispatch();

      const router = useRouter();

      const { isDesignForm, setIsDesginForm, setOpenModelNotSave, setOpenButtonBottomSave } = useContext(FormDesignContext);

      const contentRef = useRef<HTMLDivElement | null>(null);
      const [openColorSubmitBg, setOpenColorSubmitBg] = useState(false);
      const [openColorSubmitColor, setOpenColorSubmitColor] = useState(false);

      const labelClick = () => {
            if (contentRef.current) {
                  contentRef.current.focus();
            }
      };

      const updateFormAPI = useUpdateForm();

      const handleErrorInput = (e: React.ChangeEvent<HTMLDivElement>) => {
            const textContent = e.target.textContent;

            if (e.target.textContent && e.target.textContent?.length > 50) {
                  dispatch(
                        addOneToastError({
                              toast_item: { _id: v4(), type: "ERROR", toast_title: "Độ dài vượt mức", core: { message: "Độ dài chữ tối đa 50 kí tự" } },
                        }),
                  );

                  if (contentRef.current) {
                        contentRef.current.textContent = formCoreBackUp.form_button_text;
                        setLabelTextSubmit(formCoreBackUp.form_button_text);
                  }
                  return;
            }

            const labelSubmit = textContent || formCore.form_button_text;

            if (contentRef.current?.textContent?.trim()) {
                  setLabelTextSubmit(labelSubmit);
                  setOpenButtonBottomSave(true);

                  const newFormEdit = structuredClone(formCore);
                  newFormEdit.form_button_text = labelSubmit;

                  dispatch(onFetchForm({ form: newFormEdit }));

                  // router.push("#submit");
            }
      };

      const onChangeInstanceButton = () => {
            const payload: FormCore.Form = {
                  ...formCore,
                  form_button_text: contentRef.current?.textContent?.trim() || "",
            };
            updateFormAPI.mutate(payload);

            setIsDesginForm(false);
            setOpenModelNotSave(false);
      };

      useEffect(() => {
            setLabelTextSubmit(formCore.form_button_text);
      }, [formCore]);

      return (
            <>
                  <button className="relative group flex-1">
                        <Settings />

                        <div className="absolute group-hover:flex hidden bottom-[100%]  pt-[1.4rem]">
                              <div className={`${renderFormThemes(formCore.form_themes)} ${renderColorFromFormThemes(formCore.form_themes)} flex-col gap-[1.4rem] flex  rounded-[.6rem]  text-left w-[30rem] border-[.1rem] border-[var(--border-color-input)] p-[1.2rem_1rem] `}>
                                    <div className="flex justify-between">
                                          <div className="flex items-center gap-[1rem]">
                                                <span>Background: </span>
                                                <SelectColor typeEdit="ButtonSubmitBackground" setOpenColorModel={setOpenColorSubmitBg} />
                                          </div>
                                          <div className="flex items-center gap-[1rem]">
                                                <span>Màu:</span>
                                                <SelectColor typeEdit="ButtonSubmitColor" setOpenColorModel={setOpenColorSubmitBg} />
                                          </div>
                                    </div>
                                    <DivNative className="h-max flex flex-col min-w-[60%]  justify-between gap-[1.6rem]" onClick={(e) => {}}>
                                          <DivNativeRef
                                                spellCheck={false}
                                                ref={contentRef}
                                                contentEditable={true}
                                                defaultValue={labelTextSubmit}
                                                onBlur={handleErrorInput}
                                                className="input-setting   border-[1px] border-[var(--border-color-input)] p-[.8rem_1rem] rounded-lg  outline-2 focus:outline-color-main"
                                                data-text={`Nhập chữ của nút`}
                                                suppressContentEditableWarning={true}
                                          >
                                                {labelTextSubmit}{" "}
                                          </DivNativeRef>
                                    </DivNative>

                                    {/* <button className="bg-color-main p-[1rem] flex items-center justify-center gap-[1rem] opacity-80 hover:opacity-100 rounded-[.4rem] text-[#fff]">
                                    <span>Điều chỉnh</span>
                                    <BoxLoading />
                              </button> */}
                              </div>
                        </div>
                  </button>
            </>
      );
};

export default ButtonDesignSubmit;
