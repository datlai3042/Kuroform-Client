import React, { useEffect } from "react";
import { registerSchema, settingSchema } from "@/app/_schema/auth/register.schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import { UserType } from "@/app/_schema/user/user.type";
import Input from "@/app/(NextClient)/_components/ui/input/Input";
import SettingUpdateAvatar from "./SettingUpdateAvatar";
import useUpdateAccount from "@/app/hooks/user/useUpdateAccount";
import LoadingSpinner from "@/app/(NextClient)/_components/ui/loading/LoadingSpinner";
import { addOneToastError, addOneToastSuccess } from "@/app/_lib/redux/toast.slice";
import { v4 as uuid } from "uuid";
import { MailCheck, User } from "lucide-react";

type UserUpdateInfo = z.infer<typeof settingSchema>;

const SettingAccount = () => {
      const user = useSelector((state: RootState) => state.authReducer.user) as UserType;
      const updateAccountHook = useUpdateAccount();
      const dispatch = useDispatch();
      const formUpdate = useForm<UserUpdateInfo>({
            defaultValues: {
                  user_first_name: user?.user_first_name || "",
                  user_last_name: user?.user_last_name || "",
                  user_email: user?.user_email || "",
            },
            resolver: zodResolver(settingSchema),
      });

      const onSubmit = (dataForm: UserUpdateInfo) => {
            const payload = { ...user, ...dataForm };
            updateAccountHook.mutate({ user: payload });
      };
      useEffect(() => {
            if (updateAccountHook.isSuccess) {
                  dispatch(
                        addOneToastSuccess({
                              toast_item: {
                                    _id: uuid(),
                                    toast_title: "Thông tin tài khoản",
                                    type: "SUCCESS",
                                    core: { message: "Cập nhập thông tin thành công" },
                              },
                        }),
                  );
            } else {
                  if (updateAccountHook.error) {
                        const { detail } = updateAccountHook.error!.payload;
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
      }, [updateAccountHook.isSuccess, updateAccountHook.isPending]);
      return (
            <div className="flex flex-col ">
                  <SettingUpdateAvatar />

                  {user && (
                        <>
                              <form onSubmit={formUpdate.handleSubmit(onSubmit)} id="form_update" className="flex my-[1rem]  gap-[3rem_2rem] flex-wrap justify-between">
                                    <Input<UserUpdateInfo>
                                          FieldKey="user_first_name"
                                          placeholder="Nhập first name"
                                          register={formUpdate.register}
                                          type="text"
                                          watch={formUpdate.watch}
                                          error={formUpdate.formState.errors}
                                          style={{ width: "48.5%" }}
                                          icon={<User />}
                                    />

                                    <Input<UserUpdateInfo>
                                          FieldKey="user_last_name"
                                          placeholder="Nhập last name"
                                          register={formUpdate.register}
                                          type="text"
                                          watch={formUpdate.watch}
                                          error={formUpdate.formState.errors}
                                          style={{ width: "48.5%" }}
                                          icon={<User />}
                                    />

                                    <Input<UserUpdateInfo>
                                          FieldKey="user_email"
                                          placeholder="Nhập email"
                                          register={formUpdate.register}
                                          type="text"
                                          watch={formUpdate.watch}
                                          error={formUpdate.formState.errors}
                                          style={{ width: "48.5%" }}
                                          icon={<MailCheck />}
                                    />
                              </form>
                              <button
                                    disabled={updateAccountHook.isPending}
                                    type="submit"
                                    form="form_update"
                                    className="min-w-[10%] mt-[1rem] w-max p-[.8rem] h-[3.6rem] flex justify-center items-center gap-[.8rem] bg-color-main text-white rounded-lg"
                              >
                                    Cập nhập
                                    {updateAccountHook.isPending && <LoadingSpinner color="#fff" width="min-w-[2rem]" height=" min-h-[2rem]" />}
                              </button>
                        </>
                  )}
            </div>
      );
};

export default SettingAccount;
