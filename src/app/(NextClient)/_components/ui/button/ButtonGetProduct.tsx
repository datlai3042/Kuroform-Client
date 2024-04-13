"use client";

import Http from "@/app/_lib/http";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ButtonGetProduct = () => {
	// const getProduct = useQuery({
	// 	queryKey: ["get-product"],
	// 	queryFn: () => Http.get("/v1/api/product/get-all-product"),
	// });

	return <button>ButtonGetProduct</button>;
};

export default ButtonGetProduct;
