import { UserType } from "@/app/_schema/user/user.type";
import { FormCore } from "@/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
      formCoreOriginal: FormCore.Form;
      formCoreBackUp: FormCore.Form;
      colorCore: string;
      form_delete: number;
      form_public: number;
      form_private: number;
      focus_search: boolean;
      update_html_title: boolean,
      update_html_title_value: string,
      
};

const formInitital: FormCore.Form = {
      _id: "",
      form_owner: "",
      form_views: 0,
      form_button_text: '',
      form_response: 0,
      form_title: {
            form_title_mode_image: "Normal",
            form_title_value: "",
            form_title_size: 40,
            form_title_color: "#2568aa",
            form_title_style: "normal",
            form_title_sub: [],
      },
      form_avatar_state: false,
      form_background_state: false,
      form_mode_display: "basic",
      form_inputs: [],
      form_setting_default: {
            form_avatar_default_url: "",
            form_background_default_url: "",
            form_title_size_default: 14,
            form_title_style_default: "normal",
            form_title_color_default: "#00000",
            form_avatar_default_mode: "circle",
            form_avatar_default_postion: "left",
            input_color: "",
            input_size: 14,
            input_style: "normal",
      },
      form_state: "isDraff" as FormCore.FormState,
      form_button_background: '',
      form_button_color: '',
      form_input_styles: {
            borderColor: '',
            borderWidth: 1,
            color: '',
            radius: 4,
      },
      form_styles: 'GOOGLE_FORM',
      form_themes: 'AUTO',
};

const initialState: InitialState = {
      formCoreOriginal: formInitital,
      formCoreBackUp: formInitital,
      colorCore: "",
      form_delete: 0,
      form_public: 0,
      form_private: 0,
      focus_search: false,
      update_html_title: false,
      update_html_title_value: '',

};

const formEditSlice = createSlice({
      name: "formEdit",
      initialState,
      reducers: {
            onFetchForm: (state, data: PayloadAction<{ form: FormCore.Form }>) => {
                  state.formCoreOriginal = { ...data.payload.form };
                  state.formCoreBackUp = { ...data.payload.form };
                  state.colorCore = data.payload.form.form_title.form_title_color || data.payload.form.form_setting_default.form_title_color_default;
            },

            onEditForm: (state, data: PayloadAction<{ form: FormCore.Form, isUpdateHtmlTitle?: boolean }>) => {
                  state.formCoreOriginal = data.payload.form;
                  state.colorCore = data.payload.form.form_title.form_title_color || data.payload.form.form_setting_default.form_title_color_default;
                  if (data.payload.isUpdateHtmlTitle) {
                        state.update_html_title = true;
                  }
            },
            resetUpdateHTMLTile: (state) => {
                  state.update_html_title = false;
            },
            onFetchFormState: (state, data: PayloadAction<{ form_delete: number; form_public: number; form_private: number }>) => {
                  const { form_delete, form_private, form_public } = data.payload;
                  (state.form_delete = form_delete), (state.form_private = form_private);
                  state.form_public = form_public;
            },

            onFocusSearch: (state, data: PayloadAction<{ focus: boolean }>) => {
                  const { focus } = data.payload;
                  state.focus_search = focus;
            },

            onSetHTMLTitle: (state, data: PayloadAction<{ update: string }>) => {
                  const { update } = data.payload;
                  state.update_html_title_value = update;
            }
      },
});

export const { onFetchForm, onEditForm, onFetchFormState, onFocusSearch, resetUpdateHTMLTile, onSetHTMLTitle } = formEditSlice.actions;
export default formEditSlice.reducer;
