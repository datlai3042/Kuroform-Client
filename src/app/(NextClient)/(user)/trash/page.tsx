"use client";
import React from "react";
import ListFormDelete from "./_components/ListFormDelete";
import SettingHeader from "../settings/_components/SettingHeader";

const TrashFormPage = () => {
      return (
            <div className="w-full min-h-screen flex flex-col ">
                  <div className="px-[1rem]  bg-color-section-theme">
                        <SettingHeader />
                  </div>
                  <div className="flex-1 flex flex-col min-h-[60rem] h-full text-text-theme bg-[var(--bg-module-other)] p-[0rem_2.6rem_2rem_2.6rem]">
                        <h3 className="my-[2rem] pl-[.8rem] !text-[2.3rem]">Các form đang ở chế độ Delete</h3>
                        <div className="flex-1 w-full bg-[var(--color-section-theme)] p-[2.8rem] ">
                              <ListFormDelete />
                        </div>
                  </div>
            </div>
      );
};

export default TrashFormPage;
