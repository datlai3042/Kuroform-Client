import React, { SetStateAction } from "react";
import LoginFormRecents from "./LoginFormRecents";
import Portal from "../../_components/Portal";
import { TUserRecent } from "@/app/_schema/user/user.type";

type TProps = {
      setOpenModel: React.Dispatch<SetStateAction<boolean>>;
      userRecentItem: TUserRecent;
      openModel: boolean;
};

const ModalLoginRecents = (props: TProps) => {
      const { setOpenModel, userRecentItem, openModel } = props;

      return (
            <>
                  {openModel ? (
                        <Portal>
                              <div
                                    onClick={() => setOpenModel(false)}
                                    className="fixed z-[999] inset-0 max-w-full overflow-hidden  flex items-center justify-center bg-[rgba(0,0,0,.3)] hover:cursor-pointer"
                              >
                                    <LoginFormRecents onClose={() => setOpenModel(false)} userRecentItem={userRecentItem} />
                              </div>
                        </Portal>
                  ) : (
                        <></>
                  )}
            </>
      );
};

export default ModalLoginRecents;
