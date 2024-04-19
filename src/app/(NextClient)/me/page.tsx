"use client";
import { RootState } from "@/app/_lib/redux/store";
import { UserType } from "@/app/_schema/user/user.schema";
import React from "react";
import { useSelector } from "react-redux";

//Không export tào lào trong component

const ProfileMe = () => {
	const user = useSelector((state: RootState) => state.authReducer.user) as UserType;

	return <div>ProfileMe {user?.user_email || "none"}</div>;
};

export default ProfileMe;
