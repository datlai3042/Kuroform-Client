import React, { memo, useContext, useEffect, useState } from "react";
import InputTitle from "./InputTitle";
import { FormCore, InputCore as TInputCore } from "@/type";
import SectionOption from "../SectionOption";
import DivWrapper from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { useSortable } from "@dnd-kit/sortable";
import { UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import SetTitleInput from "../SetTitleInput";
import { useAddInputToEnter } from "@/app/hooks/useAddInputToEnter";
import FormModeCustomSetting from "../FormModeCustomSetting";
import useRemoveInputItem from "@/app/hooks/form/useRemoveInputItem";
import { clearFormAnswer } from "@/app/_lib/redux/formAnswer.slice";

type TProps = {
      InputComponent: React.ReactNode;
      inputItem: TInputCore.InputForm;
      inputTitle: string;
      dataTextTitle?: string;
};

const InputCore = (props: TProps) => {
      const { inputItem, dataTextTitle, InputComponent, inputTitle } = props;

      const dispatch = useDispatch();

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const colorMain = useSelector((state: RootState) => state.form.colorCore);
      let formStoreCache = useSelector((state: RootState) => state.formAsnwer.formAnswerStore);
      const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
            id: inputItem._id as UniqueIdentifier,
      });

      const [title, setTitle] = useState<boolean>(!!inputTitle || inputItem.type === "OPTION");
      const [focus, setFocus] = useState<boolean>(false);
      const [openSetting, setSetting] = useState<boolean>(false);

      const addInputToEnter = useAddInputToEnter(inputItem, formCore);

      const { modeScreen } = useContext(FormModeScreenContext);

      const removeInputItemAPI = useRemoveInputItem();
      const removeInputItem = () => {
            removeInputItemAPI.mutate({ form_id: formCore._id, input_id: inputItem._id! });
      };

      useEffect(() => {
            if (removeInputItemAPI.isSuccess) {
                  if (formStoreCache[formCore._id]) {
                        dispatch(clearFormAnswer({ form_id: formCore._id }));
                  }
            }
      }, [removeInputItemAPI.isSuccess]);

      const onPressEnter = async (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === "Enter") {
                  if (modeScreen === "FULL") {
                        return null;
                  }
                  (await addInputToEnter).mutate();
            }
      };

      const style = {
            transition,
            transform: CSS.Transform.toString(transform),
      };

      let $color = "#000000";

      const checkModeDisplay =
            formCore.form_mode_display === "custom"
                  ? {
                          "--bg-input-core": colorMain,
                          "--bg-input-core-2": $color,
                          // borderColor: "var(--borderInputAnswerFocus) !important",
                          borderColor: colorMain,
                          position: "relative",
                    }
                  : "";

      return (
            <div
                  className={`${
                        formCore.form_mode_display === "custom" ? "input-core shadow-md border-[.2rem] min-h-[40rem] p-[1.2rem] xl:p-[4rem]" : ""
                  }   group flex flex-col justify-center gap-[1.8rem] outline-none focus:cursor-move     rounded-[1.6rem]  `}
                  ref={setNodeRef}
                  {...attributes}
                  {...listeners}
                  style={
                        {
                              ...style,
                              ...checkModeDisplay,
                        } as React.CSSProperties
                  }
            >
                  {title && <InputTitle inputItem={inputItem} dataTextTitle={dataTextTitle} />}

                  <DivWrapper
                        className={`${
                              formCore.form_mode_display === "custom" ? " w-[100%]  xl:w-[70%]" : "w-full"
                        }  group relative min-h-[8rem] h-max pt-[2.4rem] flex items-center  `}
                  >
                        {modeScreen === "NORMAL" && (
                              <DivWrapper className=" absolute top-[-1rem]  xl:left-0  h-[2rem] text-[1.4rem] ">
                                    <SectionOption
                                          openSetting={openSetting}
                                          setOpenSetting={setSetting}
                                          funcRemoveInput={removeInputItem}
                                          inputItem={inputItem}
                                    />
                              </DivWrapper>
                        )}

                        <DivWrapper
                              className={`${
                                    formCore.form_mode_display === "custom" ? "input-core-children relative  w-[76%]" : "w-full"
                              }  h-max flex flex-col gap-[2rem] `}
                              onKeyDown={onPressEnter}
                        >
                              {InputComponent}
                        </DivWrapper>
                        {!title && modeScreen === "NORMAL" && <SetTitleInput setTitle={setTitle} focus={focus} />}
                  </DivWrapper>

                  {formCore.form_mode_display === "custom" && (
                        <FormModeCustomSetting colorMain={colorMain} inputItem={inputItem} openSetting={openSetting} setOpenSetting={setSetting} />
                  )}
            </div>
      );
};

export default memo(InputCore);
