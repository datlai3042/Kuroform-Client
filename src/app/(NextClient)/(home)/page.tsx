import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import { cookies } from "next/headers";
import Image from "next/image";
import ButtonNavigation from "../_components/ui/button/ButtonNavigation";
import ButtonCreateForm from "../_components/ui/button/ButtonCreateForm";
import { Command, Lock, TextCursorInput } from "lucide-react";
import BlockQuote from "../_components/ui/BlockQuote";
import FeatureInfoV1 from "../_components/ui/FeatureInfoV1";

export const colorPrimary = "text-violet-700";
export const backgroundPrimary = "text-violet-700";

const brandImages = [
	"/assets/images/HomePage/notion.png",
	"/assets/images/HomePage/make.png",
	"/assets/images/HomePage/buy-me-a-coffee.png",
	"/assets/images/HomePage/rakuten.png",
	"/assets/images/HomePage/glovo.png",
];

const HomePage = () => {
	return (
		<div className="flex ">
			<div className="flex flex-col min-h-screen w-screen overflow-hidden">
				<div className="flex flex-col h-[5000px]">
					<header className="p-[10px] xl:p-[20px] flex justify-between items-center">
						<Image
							src={"/assets/images/icon/logo_v2.png"}
							width={70}
							height={28}
							alt="logo"
							className="w-[70px] h-[28px]"
						/>
						<div className="flex gap-[20px]">
							<ButtonNavigation urlNavigation="/login" textContent="Đăng nhập" />
							<ButtonNavigation urlNavigation="/register" textContent="Đăng kí" />
							<ButtonNavigation
								urlNavigation="/logout"
								textContent="Đăng xuất"
								className="hidden xl:flex"
							/>
							<ButtonCreateForm
								urlNavigation="create-form"
								textContent="Tạo Form"
								className="[&]:hidden [&]:xl:flex"
							/>
						</div>
					</header>

					<div className=" relative min-h-[1200px] h-max">
						<div
							className="absolute hidden xl:block top-[230px] left-0 w-[350px] h-full "
							style={{
								backgroundImage: "url('/assets/images/HomePage/faces-left.png')",
								backgroundRepeat: "no-repeat",
								backgroundSize: "cover",
							}}
						></div>

						<div
							className="absolute hidden xl:block top-[230px] right-0 w-[500px] h-full  "
							style={{
								backgroundImage: "url('/assets/images/HomePage/faces-right.png')",
								backgroundRepeat: "no-repeat",
								backgroundSize: "contain",
								backgroundPositionX: "right",
							}}
						></div>

						<div
							className="mt-[20px] absolute block xl:hidden top-0 left-[50%] translate-x-[-50%] w-[80%] sm:w-[50%] h-[120px] overflow-hidden"
							style={{
								backgroundImage: "url('/assets/images/HomePage/faces-mobile.png')",
								backgroundRepeat: "no-repeat",
								backgroundSize: "contain",
							}}
						></div>
						<div className="absolute sm:mt-[120px] mt-[128px]  top-0 left-[50%] translate-x-[-50%] w-full xl:w-[1024px] flex flex-col justify-center items-center gap-[32px] ">
							<h1 className="relative text-[20px] xl:text-[60px] font-bold text-center">
								The simplest way to create forms
								<Image
									src={"/assets/images/HomePage/title-highlight-2.png"}
									width={181}
									height={12}
									className="hidden xl:inline absolute left-[150px] bottom-0 w-[181px] xl:h-[12px]"
									alt="highlight-text"
								/>
							</h1>
							<p className="w-full xl:w-[50%] text-[13px] xl:text-[20px] text-justify sm:text-center break-words">
								Say goodbye to boring forms. Meet Tally — the free, intuitive form builder you’ve been
								looking for.
							</p>

							<ButtonCreateForm
								urlNavigation="create-form"
								textContent="Tạo một form miễn phí"
								className="!mt-[10px] !xl:mt-[50px]"
							/>

							<video playsInline autoPlay muted loop className="w-full  border-shadow-normal">
								<source src="/assets/videos/homePage/intro.mp4" />
							</video>

							<div className="mt-[40px] w-[80%] flex items-center flex-col gap-[60px] ">
								<span className="text-[1.8rem] text-textMain  font-medium">
									Powering 200,000+ teams at the world’s best companies
								</span>
								<div className="w-full flex flex-wrap xl:flex-nowrap gap-[24px] xl:gap-[16px] items-center justify-between">
									{brandImages.map((img) => (
										<Image
											key={img}
											width={104}
											height={40}
											src={img}
											alt="brand"
											className="w-[45%] sm:w-[20%] xl:w-[104px] h-[40px]"
										/>
									))}
								</div>

								<Link href={"/register"}>
									<Image
										src={"/assets/images/HomePage/golden-kitty-badge.svg"}
										width={250}
										height={54}
										alt="..."
										className="w-[250px] h-[54px]"
									/>
								</Link>
							</div>
						</div>
					</div>
					<main className="w-full xl:w-[1024px] mt-[0px] sm:mt-[70px] xl:mt-[370px] flex flex-col gap-[32px] mx-auto h-[500px]">
						<div className="flex flex-col gap-[32px] ">
							<h2 className="text-h2 ">A form builder like no other</h2>
							<p className="text-[1.8rem] w-full xl:w-[60%] break-words text-textMain text-justify">
								Tally makes it simple for anyone to build free online forms. No need to code — just type
								your questions like you would in a doc.
							</p>
							<div className="relative w-full min-h-[360px] h-max rounded-xl shadow-shadowPink ">
								<div className="p-[24px] flex flex-col gap-[18px]">
									<h3 className="text-[rgb(248_28_229)] text-h3">
										Unlimited forms and submissions for free
									</h3>
									<p className="text-[1.2rem] xl:text-[1.8rem] text-slate-500 text-justify">
										Paywalls getting in the way of great forms? Here at Tally, we provide unlimited
										forms, submissions, and everything you need to create professional forms and
										surveys — all free of charge as long as you stay within our{" "}
										<span className="underline text-textMain">fair usage guidelines.</span>
									</p>
								</div>
								<Image
									width={1160}
									height={279}
									alt="bg"
									src={"/assets/images/HomePage/dive-in.png"}
									className="absolute bottom-0 left-0 w-full h-[140px] xl:h-[200px]"
								/>
							</div>
						</div>

						<div className=" flex flex-col xl:flex-row gap-[40px]">
							<div className="border-shadow-normal w-full xl:w-[60%] h-[365px] xl:h-[510px]  flex flex-col gap-[10px] overflow-hidden">
								<div className="p-[16px] xl:p-[30px] flex flex-col gap-[20px]">
									<Command className="text-pinkCustom" />
									<h4 className="text-h4 font-semibold">Just start typing</h4>
									<p className="text-[1.4rem] xl:text-[1.6rem]">
										Tally is a new type of online form builder that works like a text document. Just
										start typing on the page and insert blocks same as Notion.
									</p>
								</div>
								<video playsInline autoPlay muted loop className="flex-1 w-full">
									<source src="/assets/videos/homePage/just-type-card.mp4" className="w-full" />
								</video>
							</div>
							<div className="border-shadow-normal w-full xl:w-[40%] h-[365px] xl:h-[510px]  flex flex-col gap-[10px] overflow-hidden">
								<div className="p-[16px] xl:p-[30px] flex flex-col gap-[20px]">
									<Lock className="text-pinkCustom" />
									<h4 className="text-h4 font-semibold">Privacy-friendly form builder</h4>
									<p className="text-[1.4rem] xl:text-[1.6rem]">
										Your data privacy and security are our top priorities. We are
										<span className="text-highlight">GDPR compliant</span>
										and treat your data with care and confidentiality.
									</p>
									<p className="text-[1.4rem] xl:text-[1.6rem]">
										Tally is <span className="text-highlight"> hosted in Europe</span>, we don’t use
										cookie-tracking, and all form data is securely stored, and{" "}
										<span className="text-highlight">encrypted</span>
										both in transit and at rest.{" "}
										<span className="underline text-textMain">Learn more about Tally & GDPR.</span>
									</p>
								</div>
								<Image
									width={380}
									height={240}
									src={"/assets/images/HomePage/encryption.png"}
									alt="description"
								/>
							</div>
						</div>
						<BlockQuote
							BlockquoteContent="“Loving Tally! Not sure why I only started using it now, so good!”"
							ImagePath="/assets/images/HomePage/quote-ben.jpg"
							Author="Ben Lang"
							Description="Angel investor, previously at Notion"
						/>

						<FeatureInfoV1
							BeforeTextHighlight="Simple"
							TextHighlight="but"
							AfterTextHighlight="powerful"
							ImageHighlight="/assets/images/HomePage/title-highlight-1.png"
							ImageRight="/assets/images/HomePage/click-plus.png"
							TextSub="Advanced features packed in a simple form builder. It couldn’t be easier to
										create forms that convert."
							DescriptionIcon={<TextCursorInput className="text-pinkCustom" />}
							DescriptionText="Build any form in seconds"
							DescriptionTextSub="Easily create online forms using our wide range of free input blocks. Collect
										contact info, files, signatures, payments, and much more. Build everything from
										surveys to quizzes to lead generation forms."
							DescriptionBgImg="/assets/images/HomePage/input-badges.png"
							DescriptionImage=""
						/>
					</main>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
