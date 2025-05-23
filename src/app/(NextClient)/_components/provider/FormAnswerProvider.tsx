"use client";
import { inititalValueInputAddress } from "@/app/_constant/input.constant";
import { FormCore, InputCore } from "@/type";
import React, { SetStateAction, createContext, useState } from "react";

export const FormAnswerContext = createContext<FormCore.FormAnswer.TFormAnswerContext>({
      formAnswer: {
            inputFormData: [],
            inputFormErrors: [],
            inputFormRequire: [],
            openModelError: false,
            form_answer_id: "",

            submitState: "clear",
      },

      setFormAnswer: () => {},
});

type TProps = {
      formCore: FormCore.Form;
      form_answer_id: string;
      children: React.ReactNode;
};

const FormAnswerProvider = (props: TProps) => {
      const { formCore, children, form_answer_id } = props;
      const temp :  FormCore.FormAnswer.InputFormData = {
            type: 'OPTION_MULTIPLE',
            description: [],
            value: '',
            mode: 'Require',
            title: '',
            _id: '',
            setting: {
                  
            }
      }
      const [formAnswer, setFormAnswer] = useState<FormCore.FormAnswer.FormAnswerControl>(() => {
            return {
                  inputFormData: formCore.form_inputs.map((ip) => {
                        if (ip.type === "OPTION_MULTIPLE") {
                              return {
                                    setting: ip.core.setting,
                                    _id: ip._id!,
                                    title: ip.input_title || "",
                                    mode: ip.core.setting.require ? "Require" : ("Optional" as FormCore.FormAnswer.InputFormData["mode"]),
                                    description: [],
                                    value: '',
                                    type: ip.type,
                              };
                        }

                        if (ip.type === "OPTION") {
                              return {
                                    setting: ip.core.setting,
                                    _id: ip._id!,
                                    title: ip.input_title || "",
                                    mode: ip.core.setting.require ? "Require" : ("Optional" as FormCore.FormAnswer.InputFormData["mode"]),

                                    type: ip.type,
                                    value: '',

                                    description: {
                                          option_value: "",
                                          option_id: "",
                                    },
                              };
                        }

                        if (ip.type === "ADDRESS") {
                              return {
                                    setting: ip.core.setting,
                                    _id: ip._id!,
                                    title: ip.input_title || "",
                                    mode: ip.core.setting.require ? "Require" : ("Optional" as FormCore.FormAnswer.InputFormData["mode"]),
                                    description: { addressString: "", address_full: "", addressValidate: inititalValueInputAddress, addressCore: "" },
                                    type: ip.type,
                                    value: ''
                              };
                        }

                        return {
                              setting: ip.core.setting,
                              _id: ip._id!,
                              title: ip.input_title || "",
                              mode: ip.core.setting.require ? "Require" : ("Optional" as FormCore.FormAnswer.InputFormData["mode"]),
                              value: "",
                              type: ip.type,
                        };
                  }) as FormCore.FormAnswer.InputFormData[],
                  inputFormErrors: [],
                  form_answer_id,
                  inputFormRequire: formCore.form_inputs.reduce((newArray: FormCore.FormAnswer.InputFormRequire[], inputItem) => {
                        if (inputItem.core.setting.require) newArray.push({ _id: inputItem._id, title: inputItem.input_title, checkRequire: false });
                        return newArray;
                  }, []),
                  openModelError: false,
                  submitState: "clear",
            };
      });

      return (
            <FormAnswerContext.Provider
                  value={{
                        formAnswer,
                        setFormAnswer,
                  }}
            >
                  {children}
            </FormAnswerContext.Provider>
      );
};

export default FormAnswerProvider;
