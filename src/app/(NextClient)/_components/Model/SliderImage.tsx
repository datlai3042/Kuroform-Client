"use client";
import { RootState } from "@/app/_lib/redux/store";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FormCore } from "@/type";
import ModelShowImage from "./ModelShowImage";
import FormTitleImage from "../../form/[id]/(owner)/edit/components/FormDesign/DesignTitle/FormTitleImage";

type TProps = {
	images: FormCore.FormTitleSub.Image.Core[];
	type: "stringUrl" | "Components";
	page: "Edit" | "Answer";
	colorMain: string;
};

const SliderImage = (props: TProps) => {
	const { images, type, page, colorMain } = props;

	const [indexImage, setIndexImage] = useState<number>(0);
	const [showImageModel, setShowImageModel] = useState<boolean>(false);

	const divContainerRef = useRef<HTMLDivElement | null>(null);

	const divRef = useRef<HTMLDivElement | null>(null);
	const [widthWrapper, setWidthWrapper] = useState<number>(0);

	const formCore = useSelector((state: RootState) => state.form.formCoreOriginal);

	const handleIncrease = () => {
		if (indexImage + 1 === formCore.form_title.form_title_sub.length) return;
		setIndexImage((prev) => (prev += 1));
	};

	const handleDecrease = () => {
		if (indexImage + 1 === 1) return;
		setIndexImage((prev) => (prev -= 1));
	};

	const iamgeChange = (index: number) => {
		if (divRef.current && divContainerRef.current) {
			const width = divContainerRef.current?.getBoundingClientRect().width * -1;
			divRef.current.style.transform = `translateX(${width * index}px)`;
			divRef.current.style.transition = "all 0s";
			setIndexImage(index);
		}
	};

	useEffect(() => {
		if (divRef.current && divContainerRef.current) {
			const width = divContainerRef.current?.getBoundingClientRect().width * -1;
			divRef.current.style.transform = `translateX(${width * indexImage}px)`;
			divRef.current.style.transition = "all 0s";
		}
	}, [indexImage]);

	useEffect(() => {
		if (divRef.current && divContainerRef.current) {
			const width = divContainerRef.current?.getBoundingClientRect().width * -1;
			setWidthWrapper(width);
		}
	}, []);

	const widthPage = page === "Edit" ? "w-[30rem] sm:w-[75rem] " : "w-full xl:w-[62rem]";

	return (
		<div className="w-max flex justify-center">
			<div
				ref={divContainerRef}
				className={`${widthPage}  relative h-[38rem] xl:h-[47rem] pb-[6rem]  overflow-y-hidden overflow-x-hidden`}
			>
				<div className={`w-full relative`}>
					<button
						style={{ backgroundColor: colorMain }}
						disabled={indexImage + 1 >= images.length}
						onClick={handleIncrease}
						className="absolute top-[50%] translate-y-[-50%] right-0 z-[100] w-[3rem] h-[3rem] xl:w-[4rem] xl:h-[4rem] flex items-center justify-center    rounded-full disabled:hover:cursor-not-allowed"
					>
						<ChevronRight color="white" />
					</button>
					<div
						ref={divRef}
						className="min-w-full max-h-[30rem] w-max  flex flex-wrap items-center justify-center "
					>
						{type === "Components" &&
							(images as FormCore.FormTitleSub.Image.Core[]).map((img) => (
								<div
									key={img._id}
									className={` max-h-[30rem] w-full flex justify-center`}
									onClick={() => setShowImageModel(true)}
								>
									<FormTitleImage
										mode="Slider"
										page={page}
										subTitleItem={img}
										className="!h-[30rem] "
									/>
								</div>
							))}
					</div>

					<button
						style={{ backgroundColor: colorMain }}
						disabled={indexImage === 0}
						onClick={handleDecrease}
						className="absolute top-[50%] translate-y-[-50%] left-0 w-[3rem] h-[3rem] xl:w-[4rem] xl:h-[4rem] flex items-center justify-center bg-[#ffffff] border-[.1rem]  rounded-full disabled:hover:cursor-not-allowed"
					>
						<ChevronLeft color="white" />
					</button>
				</div>

				{showImageModel && (
					<ModelShowImage
						imageActive={images[indexImage].core.url}
						imagesUrl={images.map((img) => img.core.url)}
						setOpenModel={setShowImageModel}
					/>
				)}

				<div className="absolute bottom-[1rem]  left-[50%] translate-x-[-50%] flex gap-[2rem]">
					{images.map((btn, i) => (
						<button
							key={i}
							className="w-[1.6rem] h-[1.6rem] flex items-center justify-center rounded-full bg-slate-200 "
							onClick={() => setIndexImage(i)}
						>
							{i === indexImage && (
								<p style={{ backgroundColor: colorMain }} className="w-[60%] h-[60%] rounded-full "></p>
							)}
						</button>
					))}
				</div>
				{type === "Components" && (
					<div className="absolute bottom-[5rem] w-full left-[50%] translate-x-[-50%] flex justify-center gap-[4rem] pb-[2rem]  scroll-images overflow-x-auto hover:cursor-pointer">
						{images.map((img, i) => (
							<div
								key={img._id}
								onClick={() => iamgeChange(i)}
								className={`${
									i === indexImage
										? "z-[3] border-[.4rem] border-color-main "
										: "border-[.4rem] border-transparent hover:border-color-main"
								}  relative group min-w-[7rem] min-h-[7rem] rounded-lg `}
							>
								<Image
									src={img.core.url}
									width={70}
									height={70}
									alt="image form"
									className={`group-hover:z-[3] transition-all duration-500 absolute inset-0 w-full h-full  flex items-center justify-center  bg-[#000000] opacity-75 `}
								/>
								<div className=" absolute inset-0 bg-[rgba(0,0,0,.6)] z-[2]"></div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default SliderImage;
