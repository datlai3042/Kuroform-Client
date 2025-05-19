import { FormCore } from "@/type";
import { decodeGetDateInMonth } from "./time.utils";

type FormResultBaseOnDate = {
      date_createdAt: number;
      forms: FormCore.Form[] | null;
      date_full?: string;
      match: boolean;
};

export const generateStyleBackgroundImageForm = ({ formCore, mode }: { formCore: FormCore.Form; mode: "edit" | "answer" }) => {
      const object = formCore.form_background?.object;


      const size = formCore.form_background?.size;
      const formBackgroundSize = formCore.form_background?.mode_show;

      const positionAvatar = formCore.form_avatar?.position;
      const dicX = !object?.x?.unit || object.x.unit === 'AUTO' ? 'center' : `${object.x.value}${object.x.unit}`
      const dicY = !object?.y?.unit || object.y.unit === 'AUTO' ? 'center' : `${object.y.value}${object.y.unit}`

      return {
            style_background: {
                  objectFit: formBackgroundSize,

                  width: `${size?.width ? size?.width + "px" : "100%"}`,
                  height: `${size?.height ? size?.height + "px" : "100%"}`,

                  objectPosition: ` ${dicX} ${dicY}`,
            },

            position_buttn: positionAvatar === "left" ? "right-[2rem] xl:right-[6rem]" : "left-[2rem] xl:left-[6rem]",
      };
};

export const generateStyleAvatarForm = ({ formCore }: { formCore: FormCore.Form }) => {
      const modeAPI = formCore.form_avatar?.mode_shape;
      const positionAPI = formCore.form_avatar?.position;
      let shape = "rounded-0";
      let position = "right-0";

      if (modeAPI === "circle") shape = "rounded-full";
      if (positionAPI === "left") position = "left-0";
      if (positionAPI === "center") position = "left-[50%] translate-x-[-50%]";

      return { shape, position };
};

export const renderArrayFormFilterDate = ({ dates_in_month, results }: { dates_in_month: number; results: FormCore.Form[] }) => {
      const data_in_month: FormResultBaseOnDate[] = [];
      const filter_form = Array(dates_in_month)
            .fill(0)
            .map((_, day) => day + 1)
            .map((day, i) => {
                  results.map((form) => {
                        const date = decodeGetDateInMonth(form.createdAt || "");
                        // if (date === day && !check) {
                        // 	return data_in_month.push({
                        // 		date_createdAt: day,
                        // 		forms: data_in_month[i].forms?.concat(form)!,
                        // 		match: true,
                        // 		date_full: form.createdAt,
                        // 	});
                        // }
                        if (date === day) {
                              if (!data_in_month.map((d) => d.date_createdAt).includes(day)) {
                                    return data_in_month.push({
                                          date_createdAt: day,
                                          forms: [form],
                                          match: true,
                                          date_full: form.createdAt,
                                    });
                              }
                              const found_date_create = data_in_month.findIndex((d) => d.date_createdAt === day);

                              if (found_date_create !== -1 && data_in_month[found_date_create].forms?.length! > 0) {
                                    data_in_month[found_date_create].forms?.push(form);
                                    return;
                              } else {
                                    data_in_month[found_date_create].forms = [form];
                                    data_in_month[found_date_create].match = true;
                                    data_in_month[found_date_create].date_full = form.createdAt;

                                    return;
                              }
                        }
                        if (data_in_month.map((d) => d.date_createdAt).includes(day)) {
                              return;
                        }
                        return data_in_month.push({ date_createdAt: day, forms: null, match: false });
                  });
            });
      return { data_in_month, filter_form };
};

export const calcPercentForm = ({ formAnswer, formView }: { formAnswer: number; formView: number }) => {
      let percent: number = (formAnswer / formView) * 100;
      return isNaN(percent) ? 0 : percent.toFixed(2);
};

export const checkRenderUnitValue = (formImage: FormCore.FormImageCustom | undefined, df: number) => {
      return formImage ? formImage.value : df
}

export const renderFormUnit = (formImage: FormCore.FormImageCustom | undefined): FormCore.FormImageUnit => {
      if (!formImage) {
            return 'AUTO'
      }
      return formImage.unit
}

export const renderFormThemes = (form_themes: FormCore.Form['form_themes']) => {
      if (form_themes === 'AUTO') {
            return 'bg-color-section-theme'
      }
      if (form_themes === 'DARK') {
            return 'bg-[var(--form-theme-dark)]'
      }
      return 'bg-[var(--form-theme-light)]'
}

export const renderColorFromFormThemes = (form_themes: FormCore.Form['form_themes']) => {
      if (form_themes === 'AUTO') {
            return 'text-text-theme'
      }
      if (form_themes === 'DARK') {
            return 'text-[var(--form-theme-dark-color)]'
      }
      return 'text-[var(--form-theme-light-color)]'
}


export const renderInputStyles = (inputStyle: FormCore.Form['form_input_styles'], formCore?: FormCore.Form) => {
      let styles = {}
      if (!inputStyle.borderColor && !inputStyle.borderWidth && formCore && formCore.form_styles === 'FULL_WIDTH') {
            if (inputStyle?.color) {
                  return {
                        color: inputStyle?.color
                  }
            }
      }
      if (formCore?.form_styles === 'FULL_WIDTH') {
            if (inputStyle.borderWidth === 1) {
                  if (inputStyle?.color) {
                        return {
                              color: inputStyle?.color,
                              border: 'none'
                        }
                  }
            }
            return {border: 'none'}
      }
      if (!inputStyle) {
            styles = {
                  ...styles,
                  borderColor: 'var(--border-color-input)'
            }
      } else {
            styles = {
                  ...styles,
                  borderColor: inputStyle?.borderColor
            }
      }

      if (inputStyle?.borderWidth) {
            styles = {
                  ...styles,
                  borderWidth: inputStyle?.borderWidth
            }
      }

      if (inputStyle?.radius) {
            styles = {
                  ...styles,
                  borderRadius: inputStyle?.radius || 8
            }
      }
      if (inputStyle?.color) {
            styles = {
                  ...styles,
                  color: inputStyle?.color
            }
      }

      return styles
}

export const renderUnitHeightValueBg = (formBG: FormCore.Form['form_background']) => {
      if (!formBG?.size.height?.unit || formBG.size.height.unit === 'AUTO')
            return { height: 250 }
      else {
            return { height: `${formBG.size.height.value}${formBG.size.height.unit}` }
      }
}

export const renderUnitWidthValueBg = (formBG: FormCore.Form['form_background']) => {
      if (!formBG?.size.width?.unit || formBG.size.width.unit === 'AUTO')
            return { width: '100%' }

      else {
            return { width: `${formBG.size.width.value}${formBG.size.width.unit}` }
      }
}

export const renderFormThemeAnswer = (formCore: FormCore.Form) => {
      if (formCore.form_themes === 'AUTO') {
            return 'bg-color-section-theme'
      }
      if (formCore.form_themes === 'DARK') {
            return 'bg-[var(--form-theme-dark)]'
      }
      return 'bg-[var(--form-theme-light)]'
}


export const renderValueUnit = (value: number, unit: string) => {
      return `${value}${unit}`
}
