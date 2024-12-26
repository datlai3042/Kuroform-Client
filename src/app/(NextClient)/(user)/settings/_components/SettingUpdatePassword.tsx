import Input from "@/app/(NextClient)/_components/ui/input/Input";
import { addOneToastSuccess } from "@/app/_lib/redux/toast.slice";
import { CreatePasswordType, createPasswordSchema } from "@/app/_schema/user/createPassword.schema";
import { UpdatePasswordSchema, updatePasswordSchema } from "@/app/_schema/user/updatePassword.schema";
import useCreatePassword from "@/app/hooks/user/useCreatePassword";
import useUpdatePassword from "@/app/hooks/user/useUpdatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { SetStateAction, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";

type TProps = {
      setTab: React.Dispatch<SetStateAction<"account" | "create_password" | "update_password">>;
};

const SettingUpdatePassword = (props: TProps) => {
      const { setTab } = props;

      const updatePassword = useUpdatePassword();
      const dispatch = useDispatch();

      const updatePasswordForm = useForm<UpdatePasswordSchema>({
            defaultValues: {
                  password: "",
                  new_password: "",
            },
            resolver: zodResolver(updatePasswordSchema),
      });

      const onSubmit = (form: UpdatePasswordSchema) => {
            updatePassword.mutate({ password: form.password, new_password: form.new_password });
      };

      useEffect(() => {
            if (updatePassword.isSuccess) {
                  dispatch(
                        addOneToastSuccess({
                              toast_item: {
                                    _id: uuid(),
                                    toast_title: "Thông tin tài khoản",
                                    type: "SUCCESS",
                                    core: { message: "Cập nhập mật khẩu thành công" },
                              },
                        }),
                  );
                  setTab("account");
            }
      }, [updatePassword.isSuccess]);

      return (
            <div className="min-h-full h-max">
                  <form className="flex items-center gap-[2rem]" onSubmit={updatePasswordForm.handleSubmit(onSubmit)}>
                        <Input<UpdatePasswordSchema>
                              FieldKey="password"
                              placeholder="Nhập mật khẩu"
                              register={updatePasswordForm.register}
                              type="password"
                              watch={updatePasswordForm.watch}
                              error={updatePasswordForm.formState.errors}
                        />

                        <Input<UpdatePasswordSchema>
                              FieldKey="new_password"
                              placeholder="Nhập mật khẩu mới"
                              register={updatePasswordForm.register}
                              type="password"
                              watch={updatePasswordForm.watch}
                              error={updatePasswordForm.formState.errors}
                        />

                        <button
                              type="submit"
                              className=" min-w-[15%] w-max mt-[1.4rem] p-[.8rem] h-[4.4rem] flex justify-center items-center gap-[.8rem] bg-blue-700 text-white rounded-lg"
                        >
                              Cập nhập mật khẩu
                        </button>
                  </form>
            </div>
      );
};

export default SettingUpdatePassword;
