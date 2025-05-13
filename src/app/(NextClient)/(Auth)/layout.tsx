"use client";
import { onFetchForm } from "@/app/_lib/redux/formEdit.slice";
import { FormCore as TFormCore } from "@/type";
import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Portal from "../_components/Portal";
import { FormDesignContext } from "../_components/provider/FormDesignProvider";
import { ThemeContext } from "../_components/provider/ThemeProvider";
import EditFormPage from "../form/[id]/(owner)/edit/page";

const FORM_INSTANCE = {
      form: {
            form_input_styles: {
                  borderColor: "",
                  borderWidth: 1,
                  color: "",
                  radius: 4,
            },
            screen: 'profile',
            _id: "6822a77456334e128987a4b2",
            form_owner: "66a0a5ca4ed899bf08b8f628",
            form_views: 0,
            form_response: 0,
            form_button_text: "Gửi",
            form_button_background: "",
            form_button_color: "",
            form_styles: "FULL_WIDTH",
            form_themes: "DARK",
            form_color: "",
            form_title: {
                  form_title_color: "rgb(127, 139, 199)",
                  form_title_size: 30,
                  form_title_style: "normal",
                  form_title_value: "Tạo Form nhanh với Kuroform",
                  form_title_sub: [],
                  form_title_mode_image: "Normal",
                  _id: "6822a77456334e128987a4b0",
            },
            form_avatar_state: true,
            form_background_state: true,
            form_state: "isPrivate",
            form_mode_display: "basic",
            form_setting_default: {
                  form_avatar_default_postion: "center",
                  form_background_default_url: "https://res.cloudinary.com/cloud304/image/upload/v1721751613/kuroform/systems/form/background_form_default.jpg",
                  form_avatar_default_url: "https://res.cloudinary.com/cloud304/image/upload/v1721751902/kuroform/systems/form/avatar_default.jpg",
                  form_title_color_default: "#2568aa",
                  form_title_size_default: 30,
                  form_title_style_default: "normal",
                  form_avatar_default_mode: "circle",
                  input_color: "#000000",
                  input_size: 16,
                  input_style: "normal",
                  _id: "6822a77456334e128987a4b1",
            },
            form_inputs: [
                  {
                        type: "TEXT",
                        input_title: "Nhập thông tin của bạn",
                        core: {
                              setting: {
                                    maxLength: 100,
                                    placeholder: "Nhập nội dung của bạn",
                                    minLength: 1,
                                    require: true,
                                    input_error: "Nội dung không hợp lệ",
                                    input_error_state: false,
                                    input_color: "#000000",
                                    input_size: 16,
                                    input_style: "normal",
                              },
                        },
                        _id: "6822f51876f430612ccf4e2e",
                        __v: 0,
                  },
                  {
                        type: "EMAIL",
                        input_title: "Nhập email của bạn",
                        core: {
                              setting: {
                                    maxLength: 100,
                                    placeholder: "Nhập nội dung của bạn",
                                    minLength: 1,
                                    require: true,
                                    input_error: "Nội dung không hợp lệ",
                                    input_error_state: false,
                                    input_color: "#000000",
                                    input_size: 16,
                                    input_style: "normal",
                              },
                        },
                        _id: "6822a7ab56334e128987a812",
                        __v: 0,
                  },
                  {
                        type: "FILE_IMAGE",
                        core: {
                              setting: {
                                    require: true,
                                    input_error: "Nội dung không hợp lệ",
                                    input_error_state: false,
                                    input_color: "#000000",
                                    input_size: 16,
                                    input_style: "normal",
                                    maxLength: 100,
                                    placeholder: "Nhập nội dung của bạn",
                                    minLength: 1,
                              },
                        },
                        _id: "6822a7be56334e128987a82f",
                        __v: 0,
                  },
                  {
                        type: "PHONE",
                        input_title: "Nhập số điện thoại của bạn",
                        core: {
                              setting: {
                                    require: true,
                                    input_error: "Nội dung không hợp lệ",
                                    input_error_state: false,
                                    input_color: "#000000",
                                    input_size: 16,
                                    input_style: "normal",
                                    maxLength: 100,
                                    placeholder: "Nhập nội dung của bạn",
                                    minLength: 1,
                              },
                        },
                        _id: "6822f54176f430612ccf4e68",
                        __v: 0,
                  },
                  {
                        type: "ADDRESS",
                        input_title: "Nhập địa chỉ của bạn",
                        core: {
                              setting: {
                                    require: true,
                                    input_error: "Nội dung không hợp lệ",
                                    input_error_state: false,
                                    input_color: "#000000",
                                    input_size: 16,
                                    input_style: "normal",
                                    maxLength: 100,
                                    placeholder: "Nhập nội dung của bạn",
                                    minLength: 1,
                              },
                        },
                        _id: "6822f55576f430612ccf4e8e",
                        __v: 0,
                  },
                  {
                        type: "DATE",
                        input_title: "Nhập ngày giao dịch của bạn",
                        core: {
                              setting: {
                                    require: true,
                                    input_error: "Nội dung không hợp lệ",
                                    input_error_state: false,
                                    input_color: "#000000",
                                    input_size: 16,
                                    input_style: "normal",
                                    maxLength: 100,
                                    placeholder: "Nhập nội dung của bạn",
                                    minLength: 1,
                              },
                        },
                        _id: "6822f56476f430612ccf4eb7",
                        __v: 0,
                  },
                  {
                        type: "FILE_IMAGE",
                        input_title: "Tải ảnh cá nhân của bạn",
                        core: {
                              setting: {
                                    require: true,
                                    input_error: "Nội dung không hợp lệ",
                                    input_error_state: false,
                                    input_color: "#000000",
                                    input_size: 16,
                                    input_style: "normal",
                                    maxLength: 100,
                                    placeholder: "Nhập nội dung của bạn",
                                    minLength: 1,
                              },
                        },
                        _id: "6822f59976f430612ccf4f31",
                        __v: 0,
                  },
                  {
                        type: "VOTE",
                        core: {
                              setting: {
                                    require: true,
                                    input_error: "Nội dung không hợp lệ",
                                    input_error_state: false,
                                    input_color: "#000000",
                                    input_size: 16,
                                    input_style: "normal",
                                    maxLength: 100,
                                    placeholder: "Nhập nội dung của bạn",
                                    minLength: 1,
                              },
                        },
                        _id: "6822f5aa76f430612ccf4f6e",
                        __v: 0,
                        input_title: "Nhập đánh giá của bạn",
                  },
                  {
                        type: "ANCHOR",
                        core: {
                              setting: {
                                    require: true,
                                    input_error: "Nội dung không hợp lệ",
                                    input_error_state: false,
                                    input_color: "#000000",
                                    input_size: 16,
                                    input_style: "normal",
                                    maxLength: 100,
                                    placeholder: "Nhập nội dung của bạn",
                                    minLength: 1,
                              },
                        },
                        _id: "6822f5fc76f430612ccf4fca",
                        __v: 0,
                        input_title: "Nhập địa chỉ trang web của bạn",
                  },
                  {
                        type: "OPTION",
                        core: {
                              options: [
                                    {
                                          option_id: "92c60e7f-938d-4f1c-aac5-21c63a8db317",
                                          option_value: "Front end developer",
                                    },
                                    {
                                          option_id: "a1615045-352a-44fd-a06b-626303dea030",
                                          option_value: "Back end developer",
                                    },
                                    {
                                          option_id: "c92ad990-c5c8-4564-80ad-01f0ed511c73",
                                          option_value: "Fullstack developer",
                                    },
                              ],
                              setting: {
                                    require: true,
                                    input_error: "Nội dung không hợp lệ",
                                    input_error_state: false,
                                    input_color: "#000000",
                                    input_size: 16,
                                    input_style: "normal",
                                    maxLength: 100,
                                    placeholder: "Nhập nội dung của bạn",
                                    minLength: 1,
                              },
                        },
                        _id: "6822f62476f430612ccf4fff",
                        __v: 0,
                        input_title: "Chọn lĩnh vực chuyên môn",
                  },
                  {
                        type: "OPTION_MULTIPLE",
                        core: {
                              options: [
                                    {
                                          option_id: "b7cbbdb3-4985-4ce2-ad72-2a611d48a509",
                                          option_value: "Java",
                                    },
                                    {
                                          option_id: "bb510853-ab19-414f-9257-67e12b4e4443",
                                          option_value: "Javascript",
                                    },
                                    {
                                          option_id: "901f9c95-a5ab-48fa-8b8e-6e784f583f5d",
                                          option_value: "C#",
                                    },
                                    {
                                          option_id: "0e0d22c0-963b-48c3-9546-f72125c05630",
                                          option_value: "Python",
                                    },
                                    {
                                          option_id: "8131909d-3b88-4521-9063-79d24a390401",
                                          option_value: "C++",
                                    },
                              ],
                              setting: {
                                    require: true,
                                    input_error: "Nội dung không hợp lệ",
                                    input_error_state: false,
                                    input_color: "#000000",
                                    input_size: 16,
                                    input_style: "normal",
                                    maxLength: 100,
                                    placeholder: "Nhập nội dung của bạn",
                                    minLength: 1,
                              },
                        },
                        _id: "6822f65d76f430612ccf50e9",
                        __v: 0,
                        input_title: "Nhập ngôn ngữ lập trình bạn chọn (được phép chọn nhiều hơn một)",
                  },
            ],
            createdAt: "2025-05-13T01:59:17.023Z",
            updatedAt: "2025-05-13T07:36:56.818Z",
            __v: 0,
            form_avatar: {
                  position: "left",
                  mode_shape: "circle",
                  _id: "6822a7a656334e128987a66f",
            },
            form_background: {
                  size: {
                        width: null,
                        height: null,
                  },
                  object: {
                        x: null,
                        y: null,
                  },
                  mode_show: "cover",
                  _id: "6822a7a756334e128987a80a",
            },
      },
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
      const [loader, setLoader] = useState<boolean>(false);
      const { theme } = useContext(ThemeContext);
      const url = "/assets/images/home/application_desktop_dark.png";
      const urlMobi = "/assets/images/home/application_mobile.png";
      const urlRec = "/assets/images/home/rectangle.png";
      const dispatch = useDispatch();
      const { openFormDesign } = useContext(FormDesignContext);
      useEffect(() => {
            setLoader(true);
      }, []);

      useEffect(() => {
            dispatch(onFetchForm({ form: FORM_INSTANCE.form as unknown as TFormCore.Form }));
      }, []);

      if (!loader) return null;

      return (
            <Portal>
                  <div
                        style={{ lineHeight: 1.6 }}
                        className="relative flex z-[500] w-full top-0 xl:top-0 left-0 min-h-screen  xl:pt-0    bg-color-section-theme  "
                  >
                        <div className="basis-[38rem] h-screen  overflow-auto flex-grow-[1] md:flex-grow-0 flex flex-col   px-[20px] py-[1rem]">
                              {/* <header className="w-full flex   justify-end items-center ">
                                    <ButtonDarkMode />
                              </header> */}
                              <div className="flex-1 flex   w-full text-text-theme   auth-scroll">{children}</div>
                              {/* <AuthorDat /> */}
                        </div>
                        <div className="wrapper hidden bg-[var(--color-main)]  flex-1 relative  overflow-auto min-h-full h-screen  gap-[1rem]  md:flex justify-end ">
                              <div className="min-h-full w-full">
                                    <EditFormPage params={{ id: "profile" }} />
                                    {/* <Image src={url} width={20} height={20} unoptimized={true} alt="avatar" className="w-[57vw] mr-[16vw] h-[70vh] rounded-md z-[2] fixed bottom-4" /> */}
                                    {/* <Image src={urlMobi} width={20} height={20} unoptimized={true} alt="avatar" className="w-[16vw] right-[1rem] h-[70vh] rounded-md z-[2] fixed bottom-4" /> */}
                                    {/* <Image src={urlRec} width={20} height={20} unoptimized={true} alt="avatar" className="absolute inset-0 w-full h-full z-[1]" /> */}

                                    {/* <div className="absolute inset-0  p-[1rem]">
                                    <div className="w-full h-full  border-[.1rem] border-[var(--border-color-input)] p-[1rem]"></div>
                                    </div> */}
                              </div>
                        </div>
                  </div>
            </Portal>
      );
};

export default AuthLayout;
