import useInfoFormNotification from "@/app/hooks/notifications/useInfoFormNotification";
import { Notification } from "@/type";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import LoadingArea from "../../ui/loading/LoadingArea";
import { useIntersection } from "@mantine/hooks";
import ModelOneOption from "../../Model/ModelOneOption";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/app/_lib/redux/store";
import LoadingClient from "../../LoadingClient";
type TProps = {
      notification_item: Notification.FormAnswers.NotificationFormAnswers;
};

const NotificationFormAnswers = (props: TProps) => {
      const { notification_item } = props;
      const containerRef = useRef<HTMLDivElement>(null);
      const new_notification = useSelector((state: RootState) => state.notification.new_notification);

      const { ref, entry } = useIntersection({
            root: containerRef.current,
            threshold: 1,
      });

      const infoFormNotification = useInfoFormNotification({
            form_id: notification_item.core.form_id,
            active: entry?.isIntersecting || false,
            notification_id: notification_item._id,
      });

      let image_src =
            infoFormNotification.data?.metadata.form?.form_avatar?.form_avatar_url ||
            infoFormNotification.data?.metadata.form?.form_setting_default.form_avatar_default_url;
      let titleForm = infoFormNotification.data?.metadata.form?.form_title.form_title_plain_text || infoFormNotification.data?.metadata.form?.form_title.form_title_value;

      return (
            <div className=" my-[.4rem] h-max  flex  gap-[2rem] pb-[2rem] border-b-[.1rem] border-[var(--border-color-input)] text-text-theme" ref={ref}>
                  {image_src ? (
                        <Image src={image_src} width={50} height={50} alt="avatar form" className="w-[7.4rem] h-[7.4rem] rounded-full" />
                  ) : (
                        <div className="w-[6rem] h-[6rem] rounded-full">
                              <LoadingArea />
                        </div>
                  )}
                  <div className="w-[80%]  flex flex-col gap-[1rem] text-[1.4rem] leading-10">
                        <div className="h-max text-left break-words flex flex-col gap-[.2rem] max-w-full">
                              <span className="font-semibold text-[1.4rem]">Thông báo Form: </span>
                              {titleForm ? (
                                    <p className="text-[1.2rem] ">
                                          <span>Form</span>
                                          <span className="font-semibold"> [{titleForm}] </span>

                                          <span className="h-max ">của {notification_item.core.message}</span>
                                    </p>
                              ) : (
                                    <></>
                              )}
                        </div>
                        <span className="text-left">{moment(new Date(notification_item.create_time)).format("hh:mm Do MMMM YYYY")}</span>
                        <div className="flex items-center gap-[2rem]">
                              <Link
                                    href={`/form/${notification_item.core.form_id}/summary#${notification_item.core.form_answer_id}`}
                                    className="button-color-core flex items-center gap-[1rem] text-left border-[.1rem] border-[var(--border-color-input)] hover:border-transparent p-[.3rem_1.2rem] text-[1.3rem] rounded-full w-max"
                              >
                                    Xem chi tiết
                                    {new_notification.includes(notification_item._id) && (
                                          <div className="w-[.8rem] h-[.8rem] bg-btn-design rounded-full hover:bg-[#fff]"></div>
                                    )}
                              </Link>
                        </div>
                  </div>
            </div>
      );
};

export default NotificationFormAnswers;
