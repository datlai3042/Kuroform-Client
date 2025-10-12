import Input from "@/app/(NextClient)/_components/ui/input/Input";
import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import { addOneToastError, addOneToastSuccess } from "@/app/_lib/redux/toast.slice";
import { CreatePasswordType, createPasswordSchema } from "@/app/_schema/user/createPassword.schema";
import { UpdatePasswordSchema, updatePasswordSchema } from "@/app/_schema/user/updatePassword.schema";
import useCreatePassword from "@/app/hooks/user/useCreatePassword";
import useUpdatePassword from "@/app/hooks/user/useUpdatePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyhole } from "lucide-react";
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
            } else {
                  if (updatePassword.error) {
                        const { detail } = updatePassword.error!.payload;
                        dispatch(
                              addOneToastError({
                                    toast_item: {
                                          _id: uuid(),
                                          toast_title: "Thông tin tài khoản",
                                          type: "ERROR",
                                          core: { message: detail },
                                    },
                              }),
                        );
                  }
            }
      }, [updatePassword.isSuccess, updatePassword.isPending]);

      return (
            <div className="min-h-full h-max">
                  <form className=" flex gap-[2rem] flex-wrap items-center" onSubmit={updatePasswordForm.handleSubmit(onSubmit)}>
                        <Input<UpdatePasswordSchema>
                              FieldKey="password"
                              placeholder="Nhập mật khẩu"
                              register={updatePasswordForm.register}
                              type="password"
                              watch={updatePasswordForm.watch}
                              error={updatePasswordForm.formState.errors}
                              icon={<LockKeyhole />}
                        />

                        <Input<UpdatePasswordSchema>
                              FieldKey="new_password"
                              placeholder="Nhập mật khẩu mới"
                              register={updatePasswordForm.register}
                              type="password"
                              watch={updatePasswordForm.watch}
                              error={updatePasswordForm.formState.errors}
                              icon={<LockKeyhole />}
                        />

                        <div className="block">
                              <button
                                    type="submit"
                                    className=" min-w-[15rem] my-[1.2rem] w-max  p-[.8rem] !h-[3.4rem] flex justify-center items-center gap-[.8rem] bg-color-main text-white rounded-lg"
                              >
                                    Cập nhập mật khẩu
                                    {updatePassword.isPending && <LoadingSpinner color="#fff" width="min-w-[2rem]" height=" min-h-[2rem]" />}
                              </button>
                        </div>
                  </form>
            </div>
      );
};

export default SettingUpdatePassword;
