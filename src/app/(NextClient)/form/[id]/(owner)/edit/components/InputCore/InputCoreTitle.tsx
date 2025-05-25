import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import { FormText } from "@/app/_constant/formUi.constant";
import { RootState } from "@/app/_lib/redux/store";
import useAddInputSetTitle from "@/app/hooks/useAddInputSetTitle";
import useSetTitleForm from "@/app/hooks/useSetTitleForm";
import { FormCore } from "@/type";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DesignTitleForm from "../FormDesign/DesignCommon/DesignTitleForm";
import ButtonDesignTitle from "../FormDesign/DesignTitle/ButtonDesignTitle";
import FormTitleSub from "../FormDesign/DesignTitle/FormTitleSub";
import EditorWriter from "@/app/(NextClient)/_components/Editor/EditorWriter";

export interface InputCoreTitleProps extends React.ComponentProps<"div"> {}

const InputCoreTitle = (props: InputCoreTitleProps) => {
      const dispatch = useDispatch();
      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;

      const [openDesignTitle, setOpenDesignTitle] = useState<boolean>(false);

      const divContentRef = useRef<HTMLDivElement | null>(null);
      const [value, setValue] = useState<string>(formCore.form_title.form_title_value ? formCore.form_title.form_title_value : "");
      const { modeScreen } = useContext(FormModeScreenContext);
      const { theme } = useContext(ThemeContext);

      const useAddInputSetValueTitle = useAddInputSetTitle();
      const setTilteForm = useSetTitleForm();

      const onPressEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
                  e.preventDefault();
                  const title = divContentRef.current?.textContent || "";
                  const formClone = { ...formCore };
                  useAddInputSetValueTitle.mutate({ form: formClone, title });
            }
      };

      // const onChangeTitle = (e: React.ChangeEvent<HTMLDivElement>) => {
      //       if (divContentRef.current && divContentRef.current.textContent !== formCore.form_title.form_title_value) {
      //             const titleCurrent = divContentRef.current.textContent;
      //             setValue(divContentRef.current.textContent as string);
      //             setTilteForm.mutate({ form_id: formCore._id, value: titleCurrent as string });
      //       }
      // };

      const onChangeTitle = (value: string, plainText : string) => {
            setValue(value);
            setTilteForm.mutate({ form_id: formCore._id, value, plainText });
      };

      useEffect(() => {
            setValue(formCore.form_title.form_title_value);
      }, [formCore.form_title]);

      const styleEffect = {
            onCheckTitle: () => {
                  return formCore.form_title ? "opacity-100 text-slate-700" : "opacity-50 text-textHeader";
            },
      };

      return (
            <div className="flex flex-col gap-[1rem]">
                  {modeScreen === "NORMAL" && (
                        <>
                              <EditorWriter
                                    key={value}
                                    defaultValue={value}
                                    namespace="title"
                                    onUpdate={(rest, plainText ) => {
                                          onChangeTitle(rest, plainText );
                                    }}
                                    config={formCore}
                                    styleObj={{
                                          fontSize: `${
                                                formCore.form_title.form_title_size
                                                      ? formCore.form_title.form_title_size / 10 + "rem"
                                                      : formCore.form_setting_default.form_title_size_default / 10 + "rem"
                                          }`,
                                          color: `${
                                                formCore.form_title.form_title_color
                                                      ? formCore.form_title.form_title_color
                                                      : formCore.form_setting_default.form_title_color_default
                                          }`,
                                          fontStyle: `${
                                                formCore.form_title.form_title_style
                                                      ? formCore.form_title.form_title_style
                                                      : formCore.form_setting_default.form_title_style_default
                                          }`,
                                          wordBreak: "break-word",
                                    }}
                              />
                        </>
                  )}
                  {formCore.form_title.form_title_sub.length > 0 && <FormTitleSub />}
                  <ButtonDesignTitle className="" onClick={() => setOpenDesignTitle((prev) => !prev)} />
                  {openDesignTitle && <DesignTitleForm />}
                  {modeScreen === "FULL" && (
                        <ParagraphNative
                              textContent={value?.toUpperCase()}
                              className="max-w-[70rem] text-[2rem] sm:text-[4rem]  leading-relaxed	  font-black   break-words whitespace-pre-wrap text-justify"
                        />
                  )}
            </div>
      );
};

export default memo(InputCoreTitle);
