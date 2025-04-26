import React, { memo, useContext, useEffect, useState } from "react";
import InputTitle from "./InputTitle";
import { FormCore, ReactCustom, InputCore as TInputCore } from "@/type";
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
import { renderColorFromFormThemes } from "@/app/utils/form.utils";

type TProps = {
      InputComponent: React.ReactNode;
      inputItem: TInputCore.InputForm;
      inputTitle: string;
      dataTextTitle?: string;
};

const InputCore = (props: TProps) => {
      const { inputItem, dataTextTitle, InputComponent, inputTitle,  } = props;
      const dispatch = useDispatch();
      const [active,setActive] = useState(false)

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal) as FormCore.Form;
      const colorMain = useSelector((state: RootState) => state.form.colorCore);
      const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
            id: inputItem._id as UniqueIdentifier,
      });

      const [title, setTitle] = useState<boolean>(!!inputTitle || inputItem.type === "OPTION");
      const [focus, setFocus] = useState<boolean>(false);
      const [openSetting, setSetting] = useState<boolean>(false);

      const addInputToEnter = useAddInputToEnter(inputItem, formCore);

      const { modeScreen } = useContext(FormModeScreenContext);

      const removeInputItemAPI = useRemoveInputItem({
            onAfterDelete: () => {
                  dispatch(clearFormAnswer({ form_id: formCore._id }));
            },
      });
      const removeInputItem = () => {
            removeInputItemAPI.mutate({ form_id: formCore._id, input_id: inputItem._id! });
      };

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
                  className={`${renderColorFromFormThemes(
                        formCore.form_themes,
                  )}  bg-transparent  group flex flex-col justify-center gap-[.2rem] outline-none focus:cursor-move     rounded-[1.6rem]  `}
                  ref={setNodeRef}
                  {...attributes}
                  {...listeners}
                  style={
                        {
                              ...style,
                              ...checkModeDisplay,
                              opacity: isDragging ? 0.4 : "",
                        } as React.CSSProperties
                  }
            >
                  {title && <InputTitle active={active} setChangeTitle={setTitle} inputItem={inputItem} dataTextTitle={dataTextTitle} />}

                  <DivWrapper className={` group relative min-h-[8rem] h-max flex   flex-col gap-[.8rem] `}>
                        {modeScreen === "NORMAL" && (
                              <DivWrapper className=" text-[1.4rem] ">
                                    <SectionOption
                                          openSetting={openSetting}
                                          setOpenSetting={setSetting}
                                          funcRemoveInput={removeInputItem}
                                          inputItem={inputItem}
                                    />
                              </DivWrapper>
                        )}

                        <DivWrapper className={`w-full h-max flex flex-col gap-[2rem] `} onKeyDown={onPressEnter}>
                              {InputComponent}
                        </DivWrapper>
                        {!title && modeScreen === "NORMAL" && <SetTitleInput setTitle={setTitle} focus={focus} setActive={setActive}/>}
                  </DivWrapper>

                  {/* {formCore.form_mode_display === "custom" && (
                        <FormModeCustomSetting colorMain={colorMain} inputItem={inputItem} openSetting={openSetting} setOpenSetting={setSetting} />
                  )} */}
            </div>
      );
};

export default memo(InputCore);
