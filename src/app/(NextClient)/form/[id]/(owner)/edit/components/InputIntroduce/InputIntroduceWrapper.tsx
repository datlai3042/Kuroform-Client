import Portal from "@/app/(NextClient)/_components/Portal";
import ButtonNative from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNative";
import ButtonNativeIcon from "@/app/(NextClient)/_components/ui/NativeHtml/ButtonNativeIcon";
import DivNative from "@/app/(NextClient)/_components/ui/NativeHtml/DivNative";
import DivNativeRef from "@/app/(NextClient)/_components/ui/NativeHtml/DivNativeRef";
import ParagraphNative from "@/app/(NextClient)/_components/ui/NativeHtml/ParagraphNative";
import { InputCore, ReactCustom } from "@/type";
import {
      ALargeSmall,
      Anchor,
      ArrowBigRight,
      AtSign,
      Baseline,
      CalendarDays,
      Check,
      CheckCheck,
      CircleHelp,
      ListChecks,
      ListTodo,
      MapPinned,
      PhoneOutgoing,
      Plus,
      Star,
      Upload,
} from "lucide-react";
import React, { SetStateAction, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import InputGuideIntroduce from "./InputGuideIntroduce";
import InputTextIntroduce from "../InputCore/_text/InputTextIntroduce";
import InputEmailIntroduce from "../InputCore/_email/InputEmailIntroduce";
import InputOptionIntroduce from "../InputCore/_option/InputOptionIntrudce";
import InputOptionMultipleIntroduce from "../InputCore/_options/InputOptionMultipleIntroduce";
import InputDateIntroduce from "../InputCore/_date/InputDateIntroduce";
import InputVoteIntroduce from "../InputCore/_vote/InputVoteIntroduce";
import InputPhoneIntroduce from "../InputCore/_phone/InputPhoneIntroduce";
import Image from "next/image";
import InputImageIntroduce from "../InputCore/_image/InputImageIntroduct";
import IconClose from "@/app/(NextClient)/_components/ui/input/IconClose";
import InputAddressIntroduce from "../InputCore/_address/InputAddressIntroduce";
import InputAnchorIntroduce from "../InputCore/_anchor/InputAnchorIntroduce";
import {
      inputIntroduceAddress,
      inputIntroduceEmail,
      inputIntroduceOption,
      inputIntroduceOptionMultiple,
      inputIntroducePhone,
      inputIntroduceText,
      inputIntroduceVote,
} from "@/app/_constant/inputIntroduceUI.constant";
import ClickOutSide from "@/app/(NextClient)/_components/Model/ClickOutSide";
import { Select } from "antd";
import ButtonIcon from "@/app/(NextClient)/_components/ui/button/ButtonIcon";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import useChangeTypeInput from "@/app/hooks/useChangeTypeInput";

type TProps = {
      setOpenModel: React.Dispatch<SetStateAction<boolean>>;

      inputItem: InputCore.InputForm;
};

type ButtonInputType = { type: InputCore.InputForm["type"] | "Guide"; Icon: React.ReactNode; content: string };
const buttons: ButtonInputType[] = [
      { type: "Guide", Icon: <CircleHelp className="" size={18} />, content: "Hướng dẫn" },
      {
            type: "EMAIL",
            Icon: <AtSign size={18} />,
            content: inputIntroduceEmail.title,
      },
      {
            type: "TEXT",
            Icon: <Baseline size={18} />,
            content: inputIntroduceText.title,
      },
      {
            type: "VOTE",
            Icon: <Star size={18} />,

            content: inputIntroduceVote.title,
      },
      {
            type: "PHONE",
            Icon: <PhoneOutgoing size={18} />,
            content: inputIntroducePhone.title,
      },

      {
            type: "ADDRESS",
            Icon: <MapPinned size={18} />,
            content: inputIntroduceAddress.title,
      },

      {
            type: "ANCHOR",
            Icon: <Anchor size={18} />,

            content: "Liên kết",
      },
      {
            type: "OPTION",
            Icon: <Check size={18} />,
            content: inputIntroduceOption.title,
      },
      {
            type: "OPTION_MULTIPLE",
            Icon: <CheckCheck size={18} />,
            content: inputIntroduceOptionMultiple.title,
      },
      { type: "DATE", Icon: <CalendarDays className="" size={18} />, content: "Thời gian" },
      { type: "FILE_IMAGE", Icon: <Upload className="" size={18} />, content: "Upload Ảnh" },
];

const chooseInputIntroduce = (type: ButtonInputType["type"], inputItem: InputCore.InputForm, setOpenModel: ReactCustom.SetStateBoolean) => {
      switch (type) {
            case "Guide":
                  return <InputGuideIntroduce />;
            case "TEXT":
                  return <InputTextIntroduce inputItem={inputItem as InputCore.InputText.InputTypeText} setOpenModel={setOpenModel} />;

            case "EMAIL":
                  return <InputEmailIntroduce inputItem={inputItem as InputCore.InputEmail.InputTypeEmail} setOpenModel={setOpenModel} />;

            case "VOTE":
                  return <InputVoteIntroduce inputItem={inputItem as InputCore.InputVote.InputTypeVote} setOpenModel={setOpenModel} />;

            case "PHONE":
                  return <InputPhoneIntroduce inputItem={inputItem as InputCore.InputPhone.InputTypePhone} setOpenModel={setOpenModel} />;

            case "DATE":
                  return <InputDateIntroduce inputItem={inputItem as InputCore.InputDate.InputTypeDate} setOpenModel={setOpenModel} />;

            case "FILE_IMAGE":
                  return <InputImageIntroduce inputItem={inputItem as InputCore.InputImage.InputTypeImage} setOpenModel={setOpenModel} />;

            case "ADDRESS":
                  return <InputAddressIntroduce inputItem={inputItem as InputCore.InputAddress.InputTypeAddress} setOpenModel={setOpenModel} />;

            case "ANCHOR":
                  return <InputAnchorIntroduce inputItem={inputItem as InputCore.InputAnchor.InputTypeAnchor} setOpenModel={setOpenModel} />;
            case "OPTION":
                  return <InputOptionIntroduce inputItem={inputItem as InputCore.InputOption.InputTypeOption} setOpenModel={setOpenModel} />;

            case "OPTION_MULTIPLE":
                  return (
                        <InputOptionMultipleIntroduce
                              inputItem={inputItem as InputCore.InputOptionMultiple.InputTypeOptionMultiple}
                              setOpenModel={setOpenModel}
                        />
                  );

            default:
                  return <InputGuideIntroduce />;
      }
};

const InputIntroduceWrapper = (props: TProps) => {
      const { inputItem, setOpenModel } = props;

      const [inputIntroduce, setInputIntroduce] = useState<ButtonInputType["type"]>("Guide");

      const renderInputIntroduce = useMemo(() => chooseInputIntroduce(inputIntroduce, inputItem, setOpenModel), [inputIntroduce, inputItem, setOpenModel]);

      useEffect(() => {
            onControlScroll(true);

            return () => {
                  onControlScroll(false);
            };
      }, []);

      const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);
      const changeTypeInput = useChangeTypeInput();

      const handleChooseInputType = () => {
            if (inputIntroduce === "Guide") return;
            changeTypeInput.mutate({ form: formCore, inputItem, type: inputIntroduce });
      };

      const onControlScroll = (active: boolean) => {
            if (active) {
                  document.body.style.overflow = "hidden";

                  return;
            }
            document.body.style.overflow = "auto";
      };

      return (
            <Portal>
                  <DivNative className="fixed inset-0 bg-[rgba(0,0,0,0.8)] z-[999] px-[1rem] flex justify-center items-center">
                        <DivNativeRef className="relative  h-[50rem]   flex flex-col bg-color-section-theme text-text-theme rounded-lg  ">
                              <ClickOutSide width="w-[92vw]  xl:w-[76rem] " height="h-full" setOpenModel={setOpenModel}>
                                    <>
                                          <DivNative className="flex-1 flex-col sm:flex-row h-full flex px-0">
                                                <DivNative className=" min-w-[24rem] p-[2rem_1.6rem_1rem_1.6rem] xl:p-[2rem_1.4rem] flex flex-col gap-[1rem] sm:border-r-[.1rem] border-[var(--border-color-side)]  ">
                                                      <ParagraphNative className="text-textGray text-[1.2rem] font-bold opacity-80" textContent="Input" />
                                                      <DivNative className="flex flex-col gap-[1.6rem] " onClick={(e) => e.stopPropagation()}>
                                                            <Select
                                                                  defaultValue="Guide"
                                                                  style={{ width: 240 }}
                                                                  onChange={(value, ...rest) => {
                                                                        console.log({ value, rest });
                                                                        setInputIntroduce(value as ButtonInputType["type"]);
                                                                  }}
                                                                  options={[
                                                                        { value: "Guide", label: "Giao diện chung" },
                                                                        { value: "TEXT", label: "Input Text" },
                                                                        { value: "EMAIL", label: "Input Email" },
                                                                        { value: "VOTE", label: "Input Vote Sao" },
                                                                        { value: "PHONE", label: "Input Điện thoại" },
                                                                        { value: "DATE", label: "Input Ngày" },
                                                                        { value: "FILE_IMAGE", label: "Input Upload ảnh" },
                                                                        { value: "ADDRESS", label: "Input Địa chỉ" },
                                                                        { value: "ANCHOR", label: "Input Link liên kết" },
                                                                        { value: "OPTION", label: "Input Một Option" },
                                                                        { value: "OPTION_MULTIPLE", label: "Input Nhiều Option" },
                                                                  ]}
                                                            />
                                                            {inputIntroduce !== "Guide" && (
                                                                  <ButtonIcon
                                                                  
                                                                        textContent="Thêm input này"
                                                                        className="h-[50%] flex items-center p-[.4rem_.8rem]  bg-color-main rounded-[.4rem] text-[1.2rem] xl:text-[1.3rem] text-[#ffffff]"
                                                                        Icon={<Plus size={16} className="mt-[.2rem]"/>}
                                                                        onClick={handleChooseInputType}
                                                                  />
                                                            )}
                                                      </DivNative>
                                                </DivNative>
                                                <DivNative className="h-full py-[1rem] flex-1 overflow-auto ">{renderInputIntroduce}</DivNative>
                                          </DivNative>
                                          <div className="absolute right-[1rem] top-[1rem] ">
                                                <button
                                                      onClick={() => setOpenModel(false)}
                                                      type="button"
                                                      className="ml-auto  w-[12rem] h-[3.6rem] text-[1.4rem] text-white  bg-color-main  focus:ring-4  font-medium rounded-lg  px-5 py-2.5 me-2 mb-2 "
                                                >
                                                      Đóng Modal
                                                </button>
                                          </div>
                                    </>
                              </ClickOutSide>
                        </DivNativeRef>
                  </DivNative>
            </Portal>
      );
};

export default InputIntroduceWrapper;
