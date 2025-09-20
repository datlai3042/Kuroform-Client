"use client";
import { TUserRecent } from "@/app/_schema/user/user.type";
import Image from "next/image";
import Button from "../../_components/ui/button/Button";
import IconClose from "../../_components/ui/input/IconClose";
import { SetStateAction, useState } from "react";
import ModalLoginRecents from "./ModalLoginRecents";
import { Trash2 } from "lucide-react";

type TProps = {
      userItem: TUserRecent;
      onDeleteUserRecent: ({ user_id }: { user_id: string }) => void;
      onSelectUserRecent?: React.Dispatch<SetStateAction<TUserRecent>>;
      mode: "single" | "more";
};

const LoginRecents = (props: TProps) => {
      const { userItem, onDeleteUserRecent, mode = "more" } = props;
      const [openModel, setOpenModel] = useState(false);

      return (
            <>
                  <div
                        className="border-[.1rem] hover:shadow-2xl cursor-pointer relative border-[#ccc] rounded-lg w-[18rem] h-max"
                        onClick={() => setOpenModel(true)}
                  >
                        {mode !== "more" && (
                              <button
                                    onClick={() => onDeleteUserRecent({ user_id: userItem?._id })}
                                    className="absolute z-[2] top-[-2%] left-[-2%] bg-none hover:bg-[#ccc] w-[3rem] !h-[3rem] text-[1.4rem] rounded-full text-[#ccc] hover:text-[#000]"
                              >
                                    <>X</>
                              </button>
                        )}
                        <Image
                              width={80}
                              height={80}
                              src={userItem?.avatar}
                              alt="user_recents"
                              className="w-full h-[18rem] object-contain rounded-tl-lg rounded-tr-lg"
                        />
                        <div className="p-[1.4rem_.4rem] flex items-center text-[1.4rem] border-t-[.1rem] border-[#ccc]">
                              <span
                              style={{fontWeight: mode === 'more'? 700: '', }}
                              className="text-center w-full block font-medium">{userItem?.name}</span>

                              {mode === "more" && (
                                    <button
                                          onClick={() => onDeleteUserRecent({ user_id: userItem?._id })}
                                          className=" bg-none flex items-center justify-center hover:bg-red-600 rounded-md w-[3.2rem] !h-[3.2rem] text-[1.4rem] text-[#ccc]  hover:text-[#fff] "
                                    >
                                          <Trash2 />
                                    </button>
                              )}
                        </div>
                  </div>

                  <ModalLoginRecents openModel={openModel} setOpenModel={setOpenModel} userRecentItem={userItem} />
            </>
      );
};

export default LoginRecents;
