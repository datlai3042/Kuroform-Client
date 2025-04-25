import { FormCore, InputCore } from "@/type";

class RenderStyleInputAnswer {
      static BorderWrapperError({
            error,
            inputItemInArrayGlobal,
      }: {
            error: FormCore.FormAnswer.InputError;
            inputItemInArrayGlobal: FormCore.FormAnswer.ControlerInputAnswer<any>;
      }) {
            const inputError = error.error || inputItemInArrayGlobal.require;
            if (inputError) return "border-red-600";
            return " border-zinc-200";
      }

      static BorderInputError({ error }: { error: FormCore.FormAnswer.InputError }) {
            if (error.error) return "border-red-600";
            return "border-gray-100";
      }

      static StyleTitle({ inputItem, formCore }: { inputItem: InputCore.InputForm; formCore: FormCore.Form }) {
            return {
                  fontSize: inputItem.core.setting.input_size || formCore.form_setting_default.input_size,
                  color: formCore.form_themes === 'AUTO' ? formCore.form_input_styles.color : 'inherit',
                  fontStyle: inputItem.core.setting.input_style || formCore.form_setting_default.input_style,
            };
      }
}

export default RenderStyleInputAnswer;
