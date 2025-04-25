import { SetStateAction } from "react";
import { UserType } from "./app/_schema/user/user.type";
import { FormAnswerControl } from "./app/(NextClient)/_components/provider/FormAnswerProvider";

type InputType = "email" | "number" | "text" | "password" | "file" | "files";
type AuthType = {
      access_token: string;
      refresh_token: string;
      _id: string;
};

type HeaderToken = {
      "x-client-id": string;
      Authorization: string;
      refresh_token: string;
};

type JwtPayload = {
      _id: string;
      user_email: string;
      user_roles: string;
      iat: number;
      exp: number;
};

type TokenNextSync = {
      access_token: string;
      refresh_token: string;
      client_id: string;
      expireToken: string;
      code_verify_token: string;
};

type UserProp = {
      Children: React.ComponentType<{ user: UserType | null }>;
};

type Method = "GET" | "POST" | "PUT" | "DELETE";
type CustomRequest = Omit<RequestInit, "method"> & {
      baseUrl?: string;
      pathName?: string;
};

type MessageResponse = { message: string };

namespace InputCore {
      namespace Setting {
            export type InputSettingCommon = {
                  require: boolean;
                  input_error: string;
                  input_error_state: boolean;
                  input_color: string;
                  input_size: number;
                  input_style: FormCore.FormTextStyle;
                  _id: string;
            };

            type InputSettingTextCommon = {
                  placeholder?: string;
                  minLength: number;
                  maxLength: number;
            } & InputCore.Setting.InputSettingCommon;

            type InputSettingOptionCommon = InputCore.Setting.InputSettingCommon;
            type InputSettingOptionsCommon = InputCore.Setting.InputSettingCommon;

            type InputSettingVoteCommon = InputCore.Setting.InputSettingCommon;
            type InputSettingPhoneCommon = InputCore.Setting.InputSettingCommon;
            type InputSettingDate = InputCore.Setting.InputSettingCommon;
            type InputSettingImage = InputCore.Setting.InputSettingCommon & { url?: string; public_id?: string };
            type InputSettingAddress = InputCore.Setting.InputSettingCommon;
            type InputSettingAnchor = InputCore.Setting.InputSettingCommon;

            type SettingAll = InputSettingTextCommon & InputSettingOptionCommon & InputSettingDate;
      }

      namespace Commom {
            type InputCommon = {
                  input_title?: string;
                  core: {
                        setting:
                        | InputCore.Setting.InputSettingTextCommon
                        | InputCore.Setting.InputSettingOptionCommon
                        | InputCore.Setting.InputSettingDate
                        | InputCore.Setting.InputSettingVoteCommon
                        | InputCore.Setting.InputSettingPhoneCommon
                        | InputCore.Setting.InputSettingImage
                        | InputCore.Setting.InputSettingOptionCommon | InputCore.Setting.InputSettingOptionsCommon
                        ;
                  };
            };

            type InputCommonText = { core: { setting: InputCore.Setting.InputSettingTextCommon }; _id?: string };
            type InputCommonVote = { core: { setting: InputCore.Setting.InputSettingVoteCommon }; _id?: string };
            type InputCommonPhone = { core: { setting: InputCore.Setting.InputSettingPhoneCommon }; _id?: string };

            type InputCommonOption = { core: { setting: InputCore.Setting.InputSettingOptionCommon }; _id?: string };
            type InputCommonOptions = { core: { setting: InputCore.Setting.InputSettingOptionCommon }; _id?: string };

            type InputCommonDate = { core: { setting: InputCore.Setting.InputSettingDate }; _id?: string };
            type InputCommonImage = { core: { setting: InputCore.Setting.InputSettingImage }; _id?: string };
            type InputCommonAddress = { core: { setting: InputCore.Setting.InputSettingImage }; _id?: string };
            type InputCommonAnchor = { core: { setting: InputCore.Setting.InputSettingImage }; _id?: string };

            type ErrorText = "REQUIRE" | "MIN" | "MAX" | "INVAILD" | "NO-RULE";

            type ControlerInput<T> = {
                  validate: boolean;
                  value: T;
                  error: {
                        message: string;
                  };
            };
      }

      namespace InputEmail {
            export type InputSettingEmail = InputCore.Setting.InputSettingTextCommon;
            export type InputTypeEmail = InputCore.Commom.InputCommon &
                  InputCore.Commom.InputCommonText & {
                        type: "EMAIL";
                        // core: {
                        // 	setting: InputCore.Setting.InputSettingTextCommon;
                        // };
                  };
      }

      namespace InputDate {
            export type InputSettingDate = InputCore.Setting.InputSettingDate;

            export type InputTypeDate = InputCore.Commom.InputCommon &
                  InputCore.Commom.InputCommonDate & {
                        type: "DATE";
                  };
      }

      namespace InputText {
            export type InputText = "TEXT";
            export type InputSettingText = InputCore.Setting.InputSettingTextCommon;

            export type InputTypeText = InputCore.Commom.InputCommon &
                  InputCore.Commom.InputCommonText & {
                        type: InputText;
                        // core: {
                        // 	setting: InputCore.Setting.InputSettingTextCommon;
                        // };
                  };
      }

      namespace InputPhone {
            export type InputSettingPhone = InputCore.Setting.InputSettingPhoneCommon;
            export type InputTypePhone = InputCore.Commom.InputCommon &
                  InputCore.Commom.InputCommonPhone & {
                        type: "PHONE";
                        // core: {
                        // 	setting: InputCore.Setting.InputSettingPhoneCommon;
                        // };
                  };
      }

      namespace InputVote {
            export type InputSettingVote = InputCore.Setting.InputSettingVoteCommon;
            export type InputTypeVote = InputCore.Commom.InputCommon &
                  InputCore.Commom.InputCommonVote & {
                        type: "VOTE";
                        core: {
                              setting: InputCore.Setting.InputSettingVoteCommon;
                        };
                  };
      }

      namespace InputOption {
            type InputSettingOption = InputCore.Setting.InputSettingOptionCommon;
            type Options = { option_id: string; option_value: string };
            type InputTypeOption = InputCore.Commom.InputCommon &
                  InputCore.Commom.InputCommonOption & {
                        type: "OPTION";
                        core: {
                              options: Options[]

                              setting: InputCore.Setting.InputSettingOption;

                        };
                  };
      }

      namespace InputOptionMultiple {
            type InputSettingOptionMultiple = InputCore.Setting.InputSettingOptionCommon;
            type Options = { option_id: string; option_value: string };

            type InputTypeOptionMultiple = InputCore.Commom.InputCommon &
                  InputCore.Commom.InputCommonOption & { type: "OPTION_MULTIPLE"; core: { options: Options[], setting: InputSettingOptionMultiple } };
      }

      namespace InputImage {
            export type InputSettingImage = InputCore.Setting.InputSettingImage;
            export type InputTypeImage = InputCore.Commom.InputCommon &
                  InputCore.Commom.InputCommonImage & {
                        type: "FILE_IMAGE";
                  };
      }

      namespace InputAddress {
            export type InputSettingAddress = InputCore.Setting.InputSettingAddress;
            export type InputTypeAddress = InputCore.Commom.InputCommon &
                  InputCore.Commom.InputCommonImage & {
                        type: "ADDRESS";
                  };
      }

      namespace InputAnchor {
            export type InputSettingAnchor = InputCore.Setting.InputSettingAnchor;
            export type InputTypeAnchor = InputCore.Commom.InputCommon &
                  InputCore.Commom.InputCommonImage & {
                        type: "ANCHOR";
                  };
      }

      type InputForm =
            | InputEmail.InputTypeEmail
            | InputText.InputTypeText
            | InputVote.InputTypeVote
            | InputPhone.InputTypePhone
            | InputOption.InputTypeOption
            | InputOptionMultiple.InputTypeOptionMultiple
            | InputDate.InputTypeDate
            | InputImage.InputTypeImage
            | InputAddress.InputTypeAddress
            | InputAnchor.InputTypeAnchor;
}

namespace FormCore {
      namespace Func {
            export type RemoveInputItemFirst = (cb: ReactCustom.Form) => void;
            export type RemoveInputItemWithIndex = (cb: ReactCustom.Form, index: number) => void;
      }

      namespace FormTitleSub {
            namespace Common {
                  type Type = "Text" | "Image" | "FullDescription";
                  type FormTilteCommon = {
                        _id: string;
                        type: Type;
                        form_id: string;
                  };
            }

            namespace Text {
                  type Core = Common.FormTilteCommon & {
                        type: "Text";
                        core: {
                              value: string;
                        };
                  };
            }

            namespace Image {
                  type Core = Common.FormTilteCommon & {
                        type: "Image";
                        core: {
                              url: string;
                        };
                  };
            }

            namespace FullDescription {
                  type Core = Common.FormTilteCommon & {
                        type: "FullDescription";
                        core: {
                              header_value: string;
                              value: string;
                        };
                  };
            }

            type FormTitleBase = Text.Core | Image.Core | FullDescription.Core;
      }

      type FormAvatarPosition = "left" | "center" | "right";
      type FormAvatarMode = "circle" | "square";
      type FormImageUnit = 'AUTO' | 'PX' | '%'
      type FormImageCustom = {
            value: number,
            unit: FormImageUnit
      } | null
      export interface uploadFile extends FormData {
            append(name: "file" | "form_id", value: string | Blob, fileName?: string): void;
      }

      export type InputType = "EMAIL" | "NUMBER" | "TEXT" | "DATE" | "UNTYPE";

      export type FormBackground = {
            form_background_iamge_url?: string;
            backgroundColor?: string;
            mode_show: "cover" | "contain";
            position: {
                  top: number;
                  left: number;
            };
            object: {
                  x: FormImageCustom;
                  y: FormImageCustom;
            };
            size: {
                  width: FormImageCustom;
                  height: FormImageCustom;
            };
            padding: {
                  x: number;
                  y: number;
            };
      };

      export type FormSettingDefault = {
            input_color: string;
            input_size: number;
            input_style: FormTextStyle;
            form_background_default_url: string;
            form_avatar_default_url: string;
            form_avatar_default_postion: FormAvatarPosition;
            form_avatar_default_mode: FormAvatarMode;
            form_title_color_default: string;
            form_title_size_default: number;
            form_title_style_default: FormTextStyle;
      };

      export type FormState = "isPrivate" | "isPublic" | "isDelete";
      type FormModeDisplay = "basic" | "custom";

      type FormAvatarMode = "DEFAULT" | "CUSTOM";
      type FormAvatar = {
            form_avatar_url: string;
            mode_shape: FormAvatarMode;
            position: FormAvatarPosition;
      };

      type FormTitleImageMode = 'Normal' | 'Slider'

      type FormTitle = {
            form_title_style?: FormTextStyle;
            form_title_value: string;
            form_title_color?: string;
            form_title_size?: number;
            form_title_sub: FormCore.FormTitleSub.FormTitleBase[];
            form_title_mode_image: FormTitleImageMode;
      };
      export type FormLabel = string;
      type FormTextStyle = "normal" | "italic";

      export type Form = {
            _id: string;
            form_owner: string;
            form_title: FormCore.FormTitle;
            form_views: number;
            form_response: number;
            form_themes: 'LIGHT' | 'DARK' | 'AUTO'
            form_styles: 'GOOGLE_FORM' | 'FULL_WIDTH'
            form_input_styles: {
                  borderColor?: string,
                  borderWidth?: number,
                  color?: string,
                  radius?: number,
            },
            form_background_state: boolean;
            form_avatar_state: boolean;
            createdAt?: string;
            updatedAt?: string;
            form_background?: FormCore.FormBackground;
            form_setting_default: FormCore.FormSettingDefault;
            form_state: FormCore.FormState;
            form_mode_display: FormCore.FormModeDisplay;
            form_avatar?: FormCore.FormAvatar;
            form_inputs: InputCore.InputForm[];
            form_color?: string,
            form_button_text: string,
            form_button_color: string
            form_button_background: string
      };

      namespace FormAnswer {
            namespace Data {
                  type Common = {
                        _id: string;
                        title: string;
                        mode: "Require" | "Optional";
                        setting?: InputCore.InputForm["core"]["setting"];
                        type: InputCore.InputForm["type"];
                  };
                  interface Email extends Common {
                        type: "EMAIL";
                        value: string;
                        description: string
                  }

                  interface Text extends Common {
                        type: "TEXT";
                        value: string;
                        description: string

                  }

                  interface Option extends Common {
                        type: "OPTION";
                        value: string,
                        description: {
                              option_value: string;
                              option_id: string;
                        };

                  }

                  interface Options extends Common {
                        type: "OPTION_MULTIPLE";
                        value: string,
                        description: {
                              option_id: string;
                              option_value: string;
                        }[];
                  }

                  interface Phone extends Common {
                        type: "PHONE";
                        value: string;
                        description: string
                  }

                  interface Vote extends Common {
                        type: "VOTE";
                        value: string;
                        description: string

                  }

                  interface Image extends Common {
                        type: "FILE_IMAGE";
                        value: string;
                        description: string

                  }

                  interface Address extends Common {
                        type: "ADDRESS";
                        value: string;
                        description: UI.Address.AddressEnity

                  }

                  interface Date extends Common {
                        type: "DATE";
                        value: string;
                        description: string
                  }

                  interface Anchor extends Common {
                        type: "ANCHOR";
                        value: string;
                        description: string
                  }

                  type InputData = Email | Text | Vote | Phone | Option | Options | Image | Address | Anchor | Date;
            }

            type FormAnswerControl = {
                  inputFormData: FormCore.FormAnswer.InputFormData[];
                  inputFormRequire: FormCore.FormAnswer.InputFormRequire[];
                  inputFormErrors: FormCore.FormAnswer.InputFormError[];
                  openModelError: boolean;
                  submitState: "pending" | "success" | "fail" | "clear";
                  form_answer_id: string;
            };

            type TFormAnswerContext = {
                  formAnswer: FormAnswerControl;
                  setFormAnswer: React.Dispatch<SetStateAction<FormAnswerControl>>;
            };
            type InputFormRequire = { _id?: string; title?: string; checkRequire: boolean };
            type InputFormData = FormAnswer.Data.InputData;

            type ControlerInputAnswer<T extends FormCore.FormAnswer.Data.InputData> = {
                  require: boolean;
                  globalError: {
                        state: boolean;
                        message: string;
                        type: InputCore.Commom.ErrorText | null;
                  };
                  input: T | null;
            };

            type InputError = {
                  error: boolean;
                  type: InputCore.Commom.ErrorText | null;
                  message: string;
            };

            type InputFormError = {
                  _id: string;
                  type: ErrorText;
                  title: string;
                  message: string;
            };

            type Answer = Omit<Data.InputData, "setting">;

            type OneReport = {
                  form_id: string;
                  answers: Answer[];
                  createdAt: Date;
                  _id: string;
            };

            type FormAnswerCore = {
                  form_id: string;
                  owner_id: string;
                  reports: OneReport[];
            };

            type InputError = {
                  error: boolean;
                  type: InputCore.Commom.ErrorText | null;
                  message: string;
            };

            namespace Common {
                  type DeleteErrorWhenFocusProps = {
                        inputItem: InputCore.InputForm;
                        setFormAnswer: React.Dispatch<React.SetStateAction<FormAnswerControl>>;
                        inputFormErrors: InputFormError[];
                  };

                  type ValidateWhenBlur<T extends InputCore.InputForm["core"]["setting"]> = {
                        inputValue: string | any;
                        inputItem: InputCore.InputForm;
                        description: any;
                        setFormAnswer: React.Dispatch<React.SetStateAction<FormAnswerControl>>;
                        validateCallback: ({ inputValue, inputSetting, description }: { inputValue: string | any; inputSetting: T, description: FormCore.FormAnswer.Data.Address["description"] }) => {
                              _next: boolean;
                              message: string;
                              type: InputCore.Commom.ErrorText | null;
                        };
                  };
            }
      }
}

namespace User {
      export interface uploadFile extends FormData {
            append(name: "file", value: string | Blob, fileName?: string): void;
      }
}

namespace ReactCustom {
      export type SetStateBoolean = React.Dispatch<SetStateAction<boolean>>;
      export type Form = React.Dispatch<SetStateAction<FormCore.Form>>;
}

namespace Notification {
      namespace Type {
            type System = "System";
            type FormAnswers = "Form_Answers";
            type Account = "Account";

            type Common = System | FormAnswers | Account;
      }

      namespace Core {
            type System = {
                  message: string;
            };

            type FormAnswers = {
                  message: string;
                  form_id: string;
                  form_answer_id: string;
                  create_time: string;
            };

            type Account = {
                  message: string;
            };

            type Common = System | FormAnswers | Account;
      }

      namespace System {
            type NotificationSystem = Notification.Commom.TCommon & {
                  type: Type.System;
                  core: Core.System;
            };
      }

      namespace Account {
            type NotificationAccount = Notification.Commom.TCommon & {
                  type: Type.Account;
                  core: Core.Account;
            };
      }

      namespace FormAnswers {
            type NotificationFormAnswers = Notification.Commom.TCommon & {
                  type: Type.FormAnswers;
                  core: Core.FormAnswers;
            };
      }

      namespace Commom {
            type TCommon = {
                  create_time: Date;
                  _id: string;
            };
      }

      type NotifcationCore = System.NotificationSystem | Account.NotificationAccount | FormAnswers.NotificationFormAnswers;

      type NotificationUser = {
            notification_user_id: string;
            notifications: NotifcationCore[];
      };
}

namespace Toast {
      namespace ToastCommon {
            type Common = {
                  _id: string;
                  toast_title: string;
            };
      }

      namespace ToastSuccess {
            type ToastSuccessCore = Toast.ToastCommon.Common & {
                  type: "SUCCESS";
                  core: {
                        message: string;
                  };
            };
      }

      namespace ToastFormAnswer {
            type ToastFormAnswerCore = Toast.ToastCommon.Common & {
                  type: "FormAnswer";
                  core: {
                        message: string;
                        url: string;
                  };
            };
      }

      namespace ToastWarning {
            type ToastWarningCore = Toast.ToastCommon.Common & {
                  type: "WARNING";
                  core: {
                        message: string;
                  };
            };
      }

      namespace ToastError {
            type ToastErrorCore = Toast.ToastCommon.Common & {
                  type: "ERROR";
                  core: {
                        message: string;
                  };
            };
      }

      type ToastCore = ToastSuccess.ToastSuccessCore | ToastWarning.ToastWarningCore | ToastError.ToastErrorCore | ToastFormAnswer.ToastFormAnswerCore;
}

namespace UI {
      namespace Calender {
            type DateNameInWeek = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
            type DateInfo = {
                  day: number;
                  day_name_in_week: string;
                  month: number;
                  year: number;
                  date_full: string;
                  state: DateState;
            };

            type DateState = "previos" | "current" | "next";

            type DateInWeekInfo = {
                  [key in DateNameInWeek]: DateInfo[];
            };

            type RenderDateInMonth = {
                  week_count: number;
                  week_menber: DateInfo[];
            };

            namespace Event {
                  type DateResult = {
                        day: number;
                        month: number;
                        year: number;
                        date_string: string;
                  };
                  type ChangeEvent = (dateReturn: DateResult) => void;
            }
      }

      namespace Rate {
            type RatePoint = "none" | "mid" | "hight";
            type RateControl = { point: RatePoint; index: number };
      }

      namespace Address {
            export type AddressValidate = [
                  { type: "province"; code: string; name_with_type: string; path_with_type: string },

                  { type: "district"; code: string; name_with_type: string; path_with_type: string },

                  { type: "ward"; code: string; name_with_type: string; path_with_type: string },
                  { type: "street"; code: string; name_with_type: string; path_with_type: string },
            ];

            type AddressType = "province" | "district" | "ward" | "street";
            type AddressEnity = {
                  addressString: string;
                  addressValidate: AddressValidate;
                  address_full: string;
                  addressCore: string;
            };
            type OnChange = (address: AddressEnity) => void;
      }
}

namespace API {
      namespace Common {
            namespace Address {
                  type Province = {
                        _id: string;
                        name: string;
                        type: string;
                        name_with_type: string;
                        code: string;
                        path_with_type: string;

                        isDeleted: boolean;
                  };

                  type District = {
                        _id: string;
                        name: string;
                        type: string;
                        slug: string;
                        name_with_type: string;
                        path: string;
                        path_with_type: string;
                        code: string;
                        parent_code: string;
                        isDeleted: boolean;
                  };

                  type Ward = {
                        _id: string;
                        name: string;
                        type: string;
                        slug: string;
                        name_with_type: string;
                        path: string;
                        path_with_type: string;
                        code: string;
                        parent_code: string;
                        isDeleted: boolean;
                  };
            }
      }
}
