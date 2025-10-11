import { onFetchUser } from "@/app/_lib/redux/authentication.slice";
import { checkValueHref } from "@/app/_lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { LockKeyhole } from "lucide-react";
import { TUserRecent } from "@/app/_schema/user/user.type";
import { loginSchema, LoginType } from "@/app/_schema/auth/login.schema";
import { ResponseApi, ResponseAuth } from "@/app/_schema/api/response.shema";
import AuthService from "@/app/_services/auth.service";
import Input from "../../_components/ui/input/Input";
import Button from "../../_components/ui/button/Button";
type TProps = {
  onClose?: () => void;
  userRecentItem: TUserRecent;
};
const LoginFormRecents = (props: TProps) => {
  const { onClose, userRecentItem } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const loginForm = useForm<LoginType>({
    defaultValues: {
      user_email: userRecentItem?.email,
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

  const renderUserName = () => {
    if (userRecentItem?.user_last_name && userRecentItem?.user_first_name) {
      return (
        userRecentItem?.user_first_name + " " + userRecentItem?.user_last_name
      );
    }
    if (!userRecentItem?.user_last_name && userRecentItem?.user_first_name) {
      return userRecentItem?.user_first_name;
    }

    if (userRecentItem?.user_last_name && !userRecentItem?.user_first_name) {
      return userRecentItem?.user_last_name;
    }

    return userRecentItem?.email;
  };

  return (
    <div
      style={{
        boxShadow: "0 2px 4px #0000001a,0 8px 16px #0000001a",
      }}
      className="relative  bg-[#fff] w-[44rem]   h-max mx-auto    flex justify-center items-center flex-col  gap-[3.4rem] rounded-[1.2rem] p-[2rem_2rem]"
    >
      {/* <p className=" w-full flex flex-col gap-[0rem]  items-center">
                       <span className="text-text-theme text-[4.2rem]">Kuro</span> 
                        <span className="text-[#6262e5] text-[4.2rem]">form</span> 
                        <span className="text-[#3d52a2] font-semibold text-[2.8rem]">Đăng nhập 👋</span>
                        <span className="text-[#858d8f] text-[1.2rem]">Kuroform - Đăng nhập để tiếp tục dịch vụ</span>
                  </p> */}

      <div
        className=" w-full flex flex-col justify-center gap-[2.6rem] pt-[5rem] pb-[2rem]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center">
          <div className="w-[16rem] h-[16rem]">
            <Image
              width={80}
              height={80}
              src={userRecentItem?.avatar}
              alt="user_recents"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>

        <span className="text-[2rem] font-bold text-center my-[1rem]">
          {renderUserName()}
        </span>
        <form
          className="w-full h-full flex flex-col justify-center  gap-[1.6rem] rounded-[1.2rem]"
          onSubmit={loginForm.handleSubmit(onSubmit)}
        >
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
          <Button
            disabled={loginMutation.isPending}
            loading={loginMutation.isPending}
            type="submit"
            textContent="Đăng nhập"
            className="!w-full !h-[4rem] !rounded-lg !bg-[var(--color-main)] mt-[.8rem]"
          />
        </form>

        <div className="w-full flex flex-col items-center gap-[.2rem] text-[1.4rem] ">
          {/* <p className="text-[#6262e5] font-medium text-[1.6rem]">Đăng nhập tài khoản của bạn</p> */}

          <Button
            textContent={
              <Link
                href={"/register"}
                className="!text-[#fff] text-[1.6rem]   font-bold  w-full"
              >
                <span>Tạo tài khoản</span>
              </Link>
            }
            className="!bg-[#42b72a] hover:!bg-[#36a420] !p-[2rem_2rem] !rounded-md  !w-[60%]"
          ></Button>
          {/* <p className="text-[1.4rem]">
                                                            Bạn chưa có tài khoản?{" "}
                                                            <Link href={"/register"} className="text-[var(--color-main)] underline font-semibold">
                                                                  đăng kí nhé
                                                            </Link>
                                                      </p> */}
        </div>
        {/* <SpaceLine content="Hoặc đăng nhập luôn bằng phương thức khác" /> */}
      </div>

      {onClose && (
        <div
          onClick={onClose}
          className="absolute  top-[20px] right-[10px] xl:right-[20px] text-[2rem] bg-[#cccccca1] font-bold hover:bg-[#ccc] w-[4rem] h-[4rem] flex items-center justify-center rounded-full"
        >
          X
        </div>
      )}
    </div>
  );
};

export default LoginFormRecents;
