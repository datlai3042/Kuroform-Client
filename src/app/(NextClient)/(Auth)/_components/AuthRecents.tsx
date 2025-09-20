"use client";
import { TUserRecent } from "@/app/_schema/user/user.type";
import React, { useState } from "react";
import LoginRecents from "./LoginRecents";
import ModalLoginRecents from "./ModalLoginRecents";
import LoginAddNew from "./LoginAddNew";
import ShowMoreAccountRecents from "./ShowMoreAccountRecents";

const AuthRecents = () => {
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

      const [userRecentItemCurrent, setUserRecentItemCurrent] = useState<TUserRecent | null>(null);
      const limitShowUserRecents = userRecents?.slice(0, 1);

      return (
            <>
                  <div className="flex flex-col gap-[1.4rem]">
                        <strong className="text-[3.2rem] text-color-main">@Kuroform - Project</strong>
                        <span className="text-[2.4rem] font-semibold">Đăng nhập lại vào các tài khoản trước</span>

                        <span className="text-[1.6rem] ">Click vào avatar để đăng nhập</span>
                        <div className="flex flex-wrap gap-[3rem]   mt-[1rem]">
                              {limitShowUserRecents?.map((user) => (
                                    <LoginRecents
                                          onSelectUserRecent={() => setUserRecentItemCurrent(user)}
                                          userItem={user}
                                          key={user?._id + version}
                                          onDeleteUserRecent={onDeleteUserRecent}
                                          mode="single"
                                    />
                              ))}
                              {userRecents?.length > 1 && <ShowMoreAccountRecents />}
                              <LoginAddNew />
                              {/* {userRecents?.map((user) => <LoginRecents userItem={user} key={user?._id} onDeleteUserRecent={onDeleteUserRecent} />)}

                        {userRecents?.map((user) => <LoginRecents userItem={user} key={user?._id} onDeleteUserRecent={onDeleteUserRecent} />)}

                        {userRecents?.map((user) => <LoginRecents userItem={user} key={user?._id} onDeleteUserRecent={onDeleteUserRecent} />)}

                        {userRecents?.map((user) => <LoginRecents userItem={user} key={user?._id} onDeleteUserRecent={onDeleteUserRecent} />)}

                        {userRecents?.map((user) => <LoginRecents userItem={user} key={user?._id} onDeleteUserRecent={onDeleteUserRecent} />)}

                        {userRecents?.map((user) => <LoginRecents userItem={user} key={user?._id} onDeleteUserRecent={onDeleteUserRecent} />)}

                        {userRecents?.map((user) => <LoginRecents userItem={user} key={user?._id} onDeleteUserRecent={onDeleteUserRecent} />)}

                        {userRecents?.map((user) => <LoginRecents userItem={user} key={user?._id} onDeleteUserRecent={onDeleteUserRecent} />)} */}
                        </div>
                  </div>
            </>
      );
};

export default AuthRecents;
