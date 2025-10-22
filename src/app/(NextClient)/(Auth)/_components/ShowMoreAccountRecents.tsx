import React, { SetStateAction, useState } from "react";
import LoginRecents from "./LoginRecents";
import { Trash2, User, User2, UserPlus } from "lucide-react";
import Image from "next/image";
import ModalLoginRecents from "./ModalLoginRecents";
import Portal from "../../_components/Portal";
import { TUserRecent } from "@/app/_schema/user/user.type";

const ShowMoreAccountRecents = () => {
      const [showMoreAccount, setShowMoreAccount] = useState(false);

      return (
            <>
                  <div
                        onClick={() => setShowMoreAccount(true)}
                        className="border-[.1rem] bg-[#fff] hover:shadow-2xl cursor-pointer flex flex-col relative  border-border-page-color rounded-lg h-[17rem] w-[14rem]"
                  >
                        <div className=" h-[15rem] flex items-center justify-center">
                              <div className="text-color-main w-[4rem] h-[4rem] rounded-full flex items-center justify-center">
                                    <User className=" font-black" size={36} />
                              </div>
                        </div>
                        <div className="p-[1.4rem_.4rem] text-[1.4rem] border-t-[.1rem] border-[#ccc]">
                              <span className="text-center w-full block font-bold text-color-main">Xem thêm</span>
                        </div>
                  </div>

                  <ModalShowMoreAccountRecents openModel={showMoreAccount} setOpenModel={setShowMoreAccount} />
            </>
      );
};
type TProps = {
      setOpenModel: React.Dispatch<SetStateAction<boolean>>;
      openModel: boolean;
};

const ModalShowMoreAccountRecents = (props: TProps) => {
      const { setOpenModel, openModel } = props;
      return (
            <>
                  {openModel ? (
                        <Portal>
                              <div
                                    onClick={() => setOpenModel(false)}
                                    className="fixed z-[999] inset-0 max-w-full overflow-hidden  flex items-center justify-center bg-[rgba(0,0,0,.6)] hover:cursor-pointer"
                              >
                                    <div className="nax-w-[60rem] bg-[#fff] rounded-lg">
                                          <ShowMoreAccountContent onClose={() => setOpenModel(false)} />
                                    </div>{" "}
                              </div>
                        </Portal>
                  ) : (
                        <></>
                  )}
            </>
      );
};
type TShowMoreAccountContentProps = {
      onClose?: () => void;
};
const ShowMoreAccountContent = (props: TShowMoreAccountContentProps) => {
      const { onClose } = props;
      const [userRecents, setUserRecents] = useState<TUserRecent[]>(JSON.parse(localStorage.getItem("userRecents")!) || []);
      const [version, setVersion] = useState(0);
      const onDeleteUserRecent = ({ user_id }: { user_id: string }) => {
            const loginUserRecents = localStorage.getItem("userRecents");
            if (loginUserRecents) {
                  const parseJSON = JSON.parse(loginUserRecents);
                  const data = (Array.isArray(parseJSON) ? parseJSON : []) as TUserRecent[];
                  const newData = data?.filter((user) => user?._id !== user_id);
                  localStorage.setItem("userRecents", JSON.stringify(newData));
                  setUserRecents(newData);
                  setVersion((prev) => prev + 1);
            }
      };
      return (
            <>
                  <div className="p-[3rem] max-w-[60vw] max-h-[80vh] flex flex-col gap-[1rem]" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between">
                              <div className="flex items-center gap-[1rem]  gradient-app-name text-primary-color">
                                    <UserPlus />
                                    <span className="text-[2rem] text-primary-color font-semibold">Các Account đã login</span>
                              </div>

                              <button
                                    onClick={() => onClose && onClose()}
                                    className="bg-[#cccccca1] hover:bg-color-main w-[3rem] !h-[3rem] text-[1.4rem] rounded-full text-[#000] hover:text-[#fff]"
                              >
                                    <>X</>
                              </button>
                        </div>
                        <div className="flex flex-wrap gap-[1rem] max-h-[60vh] overflow-auto  mt-[1rem]">
                              {userRecents?.map((user) => (
                                    <div className="w-[48%] min-w-[40rem]" key={user?._id + version}>
                                          <AccountLoginRecents user={user} onDeleteUserRecent={onDeleteUserRecent} />
                                    </div>
                              ))}
                        </div>
                  </div>
            </>
      );
};

const AccountLoginRecents = ({
      user,
      onDeleteUserRecent,
}: {
      user: TUserRecent;

      onDeleteUserRecent: ({ user_id }: { user_id: string }) => void;
}) => {
      const [openModel, setOpenModel] = useState(false);

      return (
            <div className="flex gap-[1.4rem] hover:bg-gray-200 justify-between border-[.1rem] border-border-page-color p-[.6rem_1rem] rounded-[.8rem]">
                  <div className="flex items-center">
                        <Image width={80} height={80} src={user?.avatar} alt="user_recents" className="w-[9rem] h-[9rem] object-cover rounded-lg" />
                  </div>

                  <div className="flex-1 p-[1rem_.4rem] flex flex-col gap-[1.3rem]  text-[1.4rem] ">
                        <div className="flex flex-col gap-[.3rem]">
                              <span style={{ fontWeight: 600 }} className=" w-full block ">
                                    {user?.user_first_name && user?.user_last_name ? user?.user_first_name + " " + user?.user_last_name : user?.name}
                              </span>
                              <span style={{ fontWeight: 600 }} className=" w-full block text-[1.3rem] opacity-70">
                                    {user?.email}
                              </span>
                        </div>
                        <div className="flex gap-[.6rem]">
                              <button
                                    onClick={() => setOpenModel(true)}
                                    className=" bg-none flex items-center gap-[.6rem] p-[1rem] justify-center bg-primary-color text-[#fff] rounded-[.6rem]   text-[1.2rem] !h-[2.8rem]  "
                              >
                                    <User2 size={18} />
                                    <span>Đăng nhập</span>
                              </button>

                              <button
                                    onClick={() => onDeleteUserRecent({ user_id: user?._id })}
                                    className=" bg-none  flex items-center gap-[.6rem] p-[1rem] hover:bg-red-600 rounded-[.6rem] border-[.1rem] border-red-500 text-[1.2rem] !h-[2.8rem] text-red-500  hover:text-[#fff] "
                              >
                                    <Trash2 size={18} />
                                    <span>Xóa Account</span>
                              </button>
                        </div>
                  </div>
                  <ModalLoginRecents openModel={openModel} setOpenModel={setOpenModel} userRecentItem={user} />
            </div>
      );
};
export default ShowMoreAccountRecents;
