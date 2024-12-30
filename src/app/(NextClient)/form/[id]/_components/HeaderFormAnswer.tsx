import { FormCore } from "@/type";
import React, { useContext } from "react";
import FormTitleImage from "../(owner)/edit/components/FormDesign/DesignTitle/FormTitleImage";
import SliderImage from "@/app/(NextClient)/_components/Model/SliderImage";
import { FormAnswerContext } from "@/app/(NextClient)/_components/provider/FormAnswerProvider";
import FormAnswerAvatar from "./_avatar/FormAnswerAvatar";

type TProps = {
      formCore: FormCore.Form;
};

const HeaderFormAnswer = (props: TProps) => {
      const { formCore } = props;

      const {
            formAnswer: { inputFormRequire },
      } = useContext(FormAnswerContext);

      const colorMain = formCore.form_title.form_title_color || formCore.form_setting_default.form_title_color_default;
      const checkMode: FormCore.FormTitle["form_title_mode_image"] = "Slider";

      let flag = false;

      const styleTitle = {
            fontSize: `${
                  formCore.form_title.form_title_size
                        ? formCore.form_title.form_title_size / 10 + "rem"
                        : formCore.form_setting_default.form_title_size_default / 10 + "rem"
            }`,
            color: `${formCore.form_title.form_title_color ? formCore.form_title.form_title_color : formCore.form_setting_default.form_title_color_default}`,
            fontStyle: `${
                  formCore.form_title.form_title_style ? formCore.form_title.form_title_style : formCore.form_setting_default.form_title_style_default
            }`,
      };

      const marginTopWhenImageAppear = formCore.form_avatar_state || formCore.form_avatar?.form_avatar_url ? "mt-[8rem]" : "mt-0";

      return (
            <header
                  style={{ borderTopColor: colorMain }}
                  className={`${
                        formCore?.form_avatar?.form_avatar_url || formCore?.form_avatar_state ? "mt-[8rem]" : "mt-[2rem]"
                  } relative w-full min-h-[14rem] m h-max p-[1.8rem_3rem] flex flex-col gap-[2rem]   break-words	 border-t-[1rem]  bg-[#ffffff] rounded-2xl`}
            >
                  {(formCore?.form_avatar?.form_avatar_url || formCore?.form_avatar_state) && <FormAnswerAvatar formCore={formCore} />}
                  <div className={`${marginTopWhenImageAppear} flex flex-col gap-[3rem]`}>
                        <h1 style={styleTitle} className=" font-light ">
                              {formCore?.form_title?.form_title_value}
                        </h1>

                        {formCore.form_title.form_title_sub.length > 0 && (
                              <div className="pt-[2rem] border-t-[.1rem] border-gray-200 flex flex-wrap gap-[2rem]">
                                    {formCore?.form_title?.form_title_sub.map((ft) => {
                                          if (ft.type === "Text" && ft?.core?.value)
                                                return (
                                                      <span key={ft._id} className="text-[1.4rem] text-justify leading-10">
                                                            {ft?.core?.value}
                                                      </span>
                                                );
                                          if (ft.type === "Image") {
                                                if (formCore?.form_title?.form_title_mode_image !== checkMode) {
                                                      return (
                                                            <div className="w-full xl:w-[45%] flex gap-[2rem]" key={ft?._id}>
                                                                  <FormTitleImage mode="Normal" page={"Answer"} subTitleItem={ft} key={ft?._id} />
                                                            </div>
                                                      );
                                                }

                                                if (formCore?.form_title?.form_title_mode_image === "Slider" && !flag) {
                                                      flag = true;
                                                      const images = formCore?.form_title?.form_title_sub.filter(
                                                            (image) => image?.type === "Image" && image?.core?.url,
                                                      ) as FormCore.FormTitleSub.Image.Core[];
                                                      return (
                                                            <SliderImage
                                                                  colorMain={colorMain as string}
                                                                  page={"Answer"}
                                                                  type="Components"
                                                                  images={images}
                                                                  key={ft?._id}
                                                            />
                                                      );
                                                }
                                          }

                                          if (ft.type === "FullDescription") {
                                                return (
                                                      <div className="  text-[1.4rem] my-[1rem]  flex flex-col gap-[1.6rem] " key={ft?._id}>
                                                            <span className="font-bold">{ft?.core?.header_value}</span>
                                                            <span>{ft?.core?.value}</span>
                                                      </div>
                                                );
                                          }
                                    })}

                                    {inputFormRequire.length > 0 && <span className="text-red-600 text-[1.4rem] mt-[2rem]">* Biểu thị câu hỏi bắt buộc</span>}
                              </div>
                        )}
                  </div>
            </header>
      );
};

export default HeaderFormAnswer;
