import { INVAILD_ERROR, REQUIRE_ERROR } from "@/app/_constant/input.constant";
import { regexHref, regexHrefSub } from "@/app/_constant/regex.constant";
import { InputCore } from "@/type";

const superAnchorValidate = ({ inputValue, inputSetting }: { inputValue: string; inputSetting: InputCore.InputAnchor.InputSettingAnchor }) => {
      let _next = true;
      let message = "";

      let type: InputCore.Commom.ErrorText | null = null;

      const { require } = inputSetting;

      if (!require && !inputValue) {
            return { _next, message, type };
      }

      if (require && !inputValue) {
            (_next = false), (message = REQUIRE_ERROR), (type = "REQUIRE");
            return { _next, message, type };
      }

      const regex = new RegExp(regexHref, regexHrefSub);
      const _validate = inputValue.match(regex);

      if (!_validate) {
            (_next = false), (message = INVAILD_ERROR("Địa chỉ đường dẫn không hợp lệ"));
            type = "INVAILD";
      }

      return { _next, message, type };
};

export default superAnchorValidate;
