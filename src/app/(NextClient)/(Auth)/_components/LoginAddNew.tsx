import { onFetchUser } from "@/app/_lib/redux/authentication.slice";
import { checkValueHref } from "@/app/_lib/utils";
import { ResponseApi, ResponseAuth } from "@/app/_schema/api/response.shema";
import { LoginType, loginSchema } from "@/app/_schema/auth/login.schema";
import { TUserRecent } from "@/app/_schema/user/user.type";
import AuthService from "@/app/_services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import {
  ArrowBigLeftDashIcon,
  Backpack,
  LockKeyhole,
  MailCheck,
  PlusIcon,
  SkipBack,
} from "lucide-react";
import { useRouter } from "next/navigation";
import React, { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Input from "../../_components/ui/input/Input";
import Button from "../../_components/ui/button/Button";
import Portal from "../../_components/Portal";

const LoginAddNew = () => {
  const [showFormLogin, setShowFormLogin] = useState(false);

  return (
    <>
      <div
        onClick={() => setShowFormLogin(true)}
        className="border-[.1rem] bg-[#fff] hover:shadow-2xl cursor-pointer flex flex-col relative  border-border-page-color rounded-lg h-[17rem] w-[14rem]"
      >
        <div className=" h-[17rem] flex items-center justify-center">
          <div className="bg-color-main w-[4rem] h-[4rem] rounded-full flex items-center justify-center">
            <PlusIcon className="text-[#fff] font-black" size={30} />
          </div>
        </div>
        <div className="p-[1.4rem_.4rem] text-[1.4rem] border-t-[.1rem] border-[#ccc]">
          <span className="text-center w-full block font-bold text-color-main">
            Thêm tài khoản
          </span>
        </div>
      </div>

      <ModalLoginAddNew
        openModel={showFormLogin}
        setOpenModel={setShowFormLogin}
      />
    </>
  );
};
type TProps = {
  setOpenModel: React.Dispatch<SetStateAction<boolean>>;
  openModel: boolean;
};

const ModalLoginAddNew = (props: TProps) => {
  const { setOpenModel, openModel } = props;
  return (
    <>
      {openModel ? (
        <Portal>
          <div
            onClick={() => setOpenModel(false)}
            className="fixed z-[999] inset-0 max-w-full overflow-hidden  flex items-center justify-center bg-[rgba(0,0,0,.3)] hover:cursor-pointer"
          >
            <div className="w-[42rem] bg-[#fff] rounded-lg">
              <FormLoginAddNew onClose={() => setOpenModel(false)} />
            </div>{" "}
          </div>
        </Portal>
      ) : (
        <></>
      )}
    </>
  );
};
type TPropsForm = {
  onClose?: () => void;
};
const FormLoginAddNew = (props: TPropsForm) => {
  const { onClose } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const loginForm = useForm<LoginType>({
    defaultValues: {
      user_email: "",
      user_password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (formLogin: LoginType) =>
      AuthService.login<LoginType, ResponseApi<ResponseAuth>>(formLogin),
    onSuccess: (response) => {},
  });

  const onSubmit = (data: LoginType) => {
    loginMutation.mutate(data);
  };

  useEffect(() => {
    if (loginMutation.isSuccess) {
      const { user } = loginMutation?.data.metadata;

      const loginUserRecents = localStorage.getItem("userRecents");
      if (loginUserRecents) {
        const parseJSON = JSON.parse(loginUserRecents);
        const data = (
          Array.isArray(parseJSON) ? parseJSON : []
        ) as TUserRecent[];
        if (
          data?.filter((userRecent) => userRecent?._id === user?._id).length ===
          0
        ) {
          data.push({
            _id: user?._id,

            avatar: checkValueHref(user?.user_avatar_current)
              ? user?.user_avatar_current
              : user?.user_avatar_system,
            name: user?.user_last_name || user?.user_email?.split("@")[0],
            user_first_name: user?.user_first_name,
            user_last_name: user?.user_last_name,
            email: user?.user_email,
          });
        }

        localStorage.setItem("userRecents", JSON.stringify(data));
      } else {
        const data = [
          {
            _id: user?._id,
            avatar: checkValueHref(user?.user_avatar_current)
              ? user?.user_avatar_current
              : user?.user_avatar_system,
            email: user?.user_email,

            name: user?.user_last_name || user?.user_email?.split("@")[0],
            user_first_name: user?.user_first_name,
            user_last_name: user?.user_last_name,
          },
        ];
        localStorage.setItem("userRecents", JSON.stringify(data));
      }
      router.push("/dashboard");
      dispatch(onFetchUser({ user }));
    }
  }, [loginMutation.isSuccess, onClose, loginMutation.data, dispatch, router]);

  useEffect(() => {
    if (Object.keys(loginForm.formState.errors).length > 0) {
    }
  }, [loginForm.formState.errors]);
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        boxShadow: "0 2px 4px #0000001a,0 8px 16px #0000001a",
      }}
      className="relative    min-h-[30rem] w-full h-max mx-auto    flex  items-center flex-col  gap-[3.4rem] rounded-[1.8rem] p-[3rem_2rem]"
    >
      {/* <p className=" w-full flex flex-col gap-[0rem]  items-center">
                           <span className="text-text-theme text-[4.2rem]">Kuro</span> 
                            <span className="text-[#6262e5] text-[4.2rem]">form</span> 
                            <span className="text-[#3d52a2] font-semibold text-[2.8rem]">Đăng nhập 👋</span>
                            <span className="text-[#858d8f] text-[1.2rem]">Kuroform - Đăng nhập để tiếp tục dịch vụ</span>
                      </p> */}

      <div className=" w-full flex flex-col gap-[1.6rem]">
        <div className="flex gap-[1rem] text-[2rem] my-[2rem] justify-center">
          <p className="whitespace-pre">Đăng nhập vào Kuroform</p>
        </div>

        <form
          className="w-full h-full flex flex-col justify-center  gap-[1.6rem] rounded-[1.2rem]"
          onSubmit={loginForm.handleSubmit(onSubmit)}
        >
          <Input<LoginType>
            FieldKey="user_email"
            placeholder="Email"
            type="email"
            register={loginForm.register}
            error={loginForm.formState.errors}
            watch={loginForm.watch}
            unActiveLabel={true}
            icon={<MailCheck />}
          />
          <Input<LoginType>
            FieldKey="user_password"
            placeholder="Mật khẩu"
            type="password"
            register={loginForm.register}
            error={loginForm.formState.errors}
            watch={loginForm.watch}
            unActiveLabel={true}
            icon={<LockKeyhole />}
          />
          <div className="flex gap-[1rem]">
            <Button
              disabled={loginMutation.isPending}
              loading={loginMutation.isPending}
              type="submit"
              textContent="Đăng nhập"
              className="!w-max min-w-[14rem] !rounded-full !h-[4rem] !bg-[var(--color-main)] mt-[.8rem]"
            />
            {onClose && (
              <Button
                disabled={loginMutation.isPending}
                loading={loginMutation.isPending}
                onClick={onClose}
                type="button"
                textContent={
                  <div className="flex gap-[.6rem]">
                    <ArrowBigLeftDashIcon />
                    <span>Đóng</span>
                  </div>
                }
                className="!w-max min-w-[14rem] border-[.1rem] border-border-page-color !bg-transparent !text-[#333] hover:!text-[#fff] hover:!bg-primary-color !rounded-full !h-[4rem] mt-[.8rem]"
              />
            )}
          </div>
        </form>
        {/* <SpaceLine content="Hoặc đăng nhập luôn bằng phương thức khác" /> */}
      </div>
    </div>
  );
};
export default LoginAddNew;
