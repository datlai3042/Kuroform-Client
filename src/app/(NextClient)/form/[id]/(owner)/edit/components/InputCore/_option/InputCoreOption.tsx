import React, { memo, useContext, useEffect, useRef, useState } from "react";
import SpanNative from "@/app/(NextClient)/_components/ui/NativeHtml/SpanNative";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import { FormModeScreenContext } from "@/app/(NextClient)/_components/provider/FormModeScreen";
import { InputCore as TInputCore } from "@/type";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ButtonAddOption from "@/app/(NextClient)/_components/ui/button/ButtonOptionValue";
import { Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import ButtonOptionValue from "@/app/(NextClient)/_components/ui/button/ButtonOptionValue";
import useAddOptionClient from "@/app/hooks/useAddOptionClient";
import useAddOptionServer from "@/app/hooks/useAddOptionServer";
import { DndContext, DragEndEvent, MouseSensor, UniqueIdentifier, closestCorners, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import usePositionOption from "@/app/hooks/usePositionOption";
import { ThemeContext } from "@/app/(NextClient)/_components/provider/ThemeProvider";
import InputCore from "../InputCore";

type TProps = {
      inputItem: TInputCore.InputOption.InputTypeOption;
      isDrap?: boolean;
};

export type SyncDataOption = {
      option_id_focus: string;
      option_process_pending: boolean;
      btn_click_add: boolean;
};

const InputCoreOption = (props: TProps) => {
      const { theme } = useContext(ThemeContext);

      const [selectValue, setSelectValue] = useState<string>("");

      const { inputItem, isDrap } = props;

      const btnAddOptionRef = useRef<HTMLButtonElement | null>(null);
      const [active, setActive] = useState(false);
      const [syncData, setSyncData] = useState<SyncDataOption>({
            option_id_focus: "",
            option_process_pending: false,
            btn_click_add: false,
      });

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const form_mode_display = formCore.form_mode_display === "custom";

      const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;
      const checkModeDisplay = formCore.form_mode_display === "custom" ? true : false;
      const title = inputItem.input_title ? inputItem.input_title : "";

      const addOptionServer = useAddOptionServer();

      const handleAddOption = () => {
            if (syncData.option_id_focus && syncData.option_process_pending) {
                  setSyncData((prev) => ({ ...prev, btn_click_add: true }));
                  return;
            }

            addOptionServer.mutate({
                  form: formCore,
                  option_id: "",
                  option_value: "",
                  inputItem,
            });
      };
      useEffect(() => {
            if (btnAddOptionRef.current && syncData.btn_click_add && !syncData.option_process_pending) {
                  btnAddOptionRef.current.click();
            }
      }, [syncData.btn_click_add, syncData.option_process_pending]);

      useEffect(() => {
            return () => {
                  btnAddOptionRef.current = null;
            };
      }, []);

      // drap các option
      const sensors = useSensors(
            useSensor(MouseSensor, {
                  activationConstraint: {
                        distance: 10,
                  },
            }),
      );

      const getPos = (id: UniqueIdentifier) => inputItem.core.options.findIndex((ip) => ip.option_id === id);
      const updatePostionOption = usePositionOption();

      const onDrapEnd = (e: DragEndEvent) => {
            const { active, over } = e;
            if (active.id === over?.id) return;

            const posActive = getPos(active.id as unknown as UniqueIdentifier);
            const postOver = getPos(over?.id as unknown as UniqueIdentifier);

            const newArray = arrayMove(inputItem.core.options, posActive, postOver);
            const newOptionArray = structuredClone(inputItem);
            newOptionArray.core.options = newArray;
            updatePostionOption.mutate({ form: formCore, inputItem, coreOption: newOptionArray.core.options });
            return newArray;
      };

      //

      useEffect(() => {
            if (!selectValue && inputItem.core.options[0]) {
                  setSelectValue(inputItem.core.options[0].option_id);
            }
      }, [inputItem.core.options, selectValue]);

      const InputOption = (
            <DivNative className={`mt-[.4rem]  bg-transparent min-h-[5rem] max-w-full flex flex-col gap-[1rem] h-max  text-[1.4rem]`}>
                  <SpanNative
                        style={{ color: formCore.form_input_styles.color || "var(--text-text-theme)" }}
                        textContent="Chọn một lựa chọn"
                        className={`${form_mode_display ? "group-hover:!text-[#ffffff]" : "text-text-theme"} text-[1.6rem] font-semibold`}
                  />

                  <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDrapEnd}>
                        <SortableContext
                              items={inputItem.core.options.map((op) => op.option_id) as unknown as UniqueIdentifier[]}
                              strategy={verticalListSortingStrategy}
                        >
                              {inputItem.core.options &&
                                    inputItem.core.options.map((op, i) => (
                                          <ButtonOptionValue
                                                key={op.option_id || Math.random().toString()}
                                                option={op}
                                                index={i}
                                                inputItem={inputItem}
                                                controllSelect={{ selectValue, setSelectValue }}
                                                syncDataController={{ syncData, setSyncData }}
                                          />
                                    ))}
                        </SortableContext>
                  </DndContext>

                  <button
                        ref={btnAddOptionRef}
                        onClick={handleAddOption}
                        className={`${
                              checkModeDisplay ? "group-hover:!bg-[#ffffff]" : ""
                        } w-max   bg-color-main text-[#fff] p-[.6rem_1rem] flex items-center gap-[1rem]  rounded-[.4rem]`}
                  >
                        <Plus size={16} className="" />
                        Thêm lựa chọn
                  </button>
                  <p className="max-w-[80%] break-words">
                        Kết quả:{" "}
                        <span className="font-medium text-[1.8rem]">
                              {inputItem.core.options.filter((op) => op.option_id === selectValue)[0]?.option_value}
                        </span>
                  </p>
            </DivNative>
      );

      return (
            <InputCore
                  isDrap={isDrap}
                  InputComponent={InputOption}
                  inputTitle={title}
                  dataTextTitle="Nhập tiêu đề chính cho các tùy chọn"
                  inputItem={inputItem}
            />
      );
};

export default memo(InputCoreOption);
