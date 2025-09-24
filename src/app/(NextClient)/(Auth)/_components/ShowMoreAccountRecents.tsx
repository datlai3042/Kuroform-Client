import React, { SetStateAction, useState } from "react";
import Portal from "../../_components/Portal";
import { TUserRecent } from "@/app/_schema/user/user.type";
import LoginRecents from "./LoginRecents";
import { User2 } from "lucide-react";

const ShowMoreAccountRecents = () => {
      const [showMoreAccount, setShowMoreAccount] = useState(false);

      return (
            <>
                  <div
                        onClick={() => setShowMoreAccount(true)}
                        className="border-[.1rem] bg-[#fff] h-[20rem] hover:shadow-2xl cursor-pointer flex flex-col relative border-[var(--border-color-login-recent)] rounded-lg w-[17rem] h-max"
                  >
                        <div className="w-[17rem] h-[15rem] flex items-center justify-center">
                              <div className="text-color-main text-[1.4rem] flex flex-col gap-[1rem] items-center justify-center">
                                    <User2 size={30}/>
                                    <span className="text-center w-full block font-bold text-color-main">Các Account đã login</span>
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
                  <div className="p-[3rem] max-w-[60vw] max-h-[80vh] flex flex-col gap-[3rem]" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between">
                              <span className="text-[2rem] text-color-main font-extrabold">Các Account đã login</span>

                              <button
                                    onClick={() => onClose && onClose()}
                              className="bg-[#cccccca1] hover:bg-color-main w-[3rem] !h-[3rem] text-[1.4rem] rounded-full text-[#000] hover:text-[#fff]"

                              >
                                    <>X</>
                              </button>
                        </div>
                        <div className="flex flex-wrap gap-[3rem] max-h-[60vh] overflow-auto  mt-[1rem]">
                              {userRecents?.map((user) => <LoginRecents mode='more' userItem={user} key={user?._id + version} onDeleteUserRecent={onDeleteUserRecent} />)}
                        </div>
                  </div>
            </>
      );
};

export default ShowMoreAccountRecents;
