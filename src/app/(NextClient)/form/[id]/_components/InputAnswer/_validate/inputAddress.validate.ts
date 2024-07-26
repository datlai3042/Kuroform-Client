import { INVAILD_ERROR, REQUIRE_ERROR } from "@/app/_constant/input.constant";
import { regexHref, regexHrefSub } from "@/app/_constant/regex.constant";
import { FormCore, InputCore, UI } from "@/type";
import { error } from "console";

export const renderVietnameseLabelAddress = (labeEnglish: UI.Address.AddressType) => {
      let _vn = "";
      switch (labeEnglish) {
            case "province": {
                  _vn = "Tỉnh - Thành phố";
                  return _vn;
            }

            case "district": {
                  _vn = "Thành phố - Huyện ";
                  return _vn;
            }

            case "ward": {
                  _vn = "Phường - Xã";
                  return _vn;
            }

            case "street": {
                  _vn = "Tên Đường";
                  return _vn;
            }
            default: {
                  _vn = "Địa chỉ";
                  return _vn;
            }
      }
};

const superAddressValidate = ({
      inputValue,
      inputSetting,
}: {
      inputValue: FormCore.FormAnswer.Data.Address["value"];
      inputSetting: InputCore.InputAddress.InputTypeAddress["core"]["setting"];
}) => {
      let _next = true;
      let message = "";
      console.log({ inputValue });
      const { addressValidate, addressString } = inputValue;
      let type: InputCore.Commom.ErrorText | null = null;
      const { require } = inputSetting;
      console.log({ inputValue });
      const full_field =
            addressValidate &&
            addressValidate[0]?.path_with_type &&
            addressValidate[1]?.path_with_type &&
            addressValidate[2]?.path_with_type &&
            addressValidate[3]?.path_with_type;
      if (require) {
            if (addressString && full_field) {
                  return { _next, message, type };
            }
            if (!addressString || !full_field) {
                  let errors: string[] = [];
                  addressValidate.forEach((address_item) => {
                        if (address_item.path_with_type) return;
                        if (address_item.type == "street") {
                              errors.push(renderVietnameseLabelAddress("street"));
                              return;
                        }
                        errors.push(renderVietnameseLabelAddress(address_item.type));
                  });
                  _next = false;

                  message = errors.join(", ");

                  message += "  bắt buộc nhập";
                  type = "INVAILD";

                  return { _next, message, type };
            }
      }

      if (!require) {
            if (full_field) {
                  return { _next, message, type };
            }
            if (
                  addressValidate &&
                  (!!addressValidate[0]?.path_with_type ||
                        !!addressValidate[1]?.path_with_type ||
                        !!addressValidate[2]?.path_with_type ||
                        !!addressValidate[3]?.path_with_type)
            ) {
                  (_next = false), (message = "Địa chỉ bạn cung cấp không đầy đủ");
                  type = "INVAILD";
                  console.log(
                        !!addressValidate[0]?.path_with_type ||
                              !!addressValidate[1]?.path_with_type ||
                              !!addressValidate[2]?.path_with_type ||
                              !!addressValidate[3]?.path_with_type,
                  );
                  return { _next, message, type };
            }

            if (!full_field) {
                  return { _next, message, type };
            }
      }
      return { _next, message, type };
};

export default superAddressValidate;
