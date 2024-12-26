"use client";
import React from "react";
import ListFormDelete from "./_components/ListFormDelete";
import SettingHeader from "../settings/_components/SettingHeader";

const TrashFormPage = () => {
      return (
            <div className="w-full min-h-screen flex flex-col p-[.8rem_0rem_0rem_0rem] gap-[2rem] bg-color-section-theme">
                  <SettingHeader />

                  <div className="flex-1 min-h-[60rem] h-full text-text-theme bg-[var(--bg-space)] p-[0rem_2.6rem_2rem_2.6rem] rounded-[1.2rem_1.2rem_0_0]">
                        <h3 className="my-[2.2rem] !text-[2.8rem]">Các form đang ở chế độ Delete</h3>
                        <div className="w-full bg-[var(--color-section-theme)] p-[2.8rem] rounded-[1.2rem_1.2rem_0_0]">
                              <ListFormDelete />
                        </div>
                  </div>

                
            </div>
      );
};

export default TrashFormPage;
