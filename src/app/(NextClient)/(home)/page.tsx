import Link from "next/link";
import React from "react";
import Image from "next/image";

import FeatureInfoV1 from "../_components/ui/FeatureInfoV1";
import ImageAndText from "../_components/ui/ImageAndText";
import IconTextLink from "../_components/ui/IconTextLink";
import Header from "../_components/Header";
import DivNative from "../_components/ui/NativeHtml/DivNative";
import ParagraphNative from "../_components/ui/NativeHtml/ParagraphNative";
import IntroduceDarkMode from "./_components/IntroduceDarkMode";
import { ExternalLink, Globe, LayoutPanelLeft, Link2, Palette, PictureInPicture2 } from "lucide-react";
import AuthorDat from "../_components/author/AuthorDat";

const InnputImages = [
	"/assets/images/home/input/email.png",
	"/assets/images/home/input/text.png",
	"/assets/images/home/input/phone.png",
	"/assets/images/home/input/vote.png",
	"/assets/images/home/input/option_one.png",
	"/assets/images/home/input/option_multiple.png",
];

const HomePage = () => {
	return (
		<DivNative className="flex  w-full min-w-full max-w-full  ">
			<DivNative className="flex w-full flex-col h-max   ">
				<DivNative className="flex flex-col ">
					<Header />
					<AuthorDat />
					<main className="xl:mt-[6rem] xl:w-[1024px] mx-auto py-[4rem] flex flex-col gap-[8rem] xl:gap-[12rem] items-center h-max relative text-text-theme">
						<DivNative className=" w-full  h-max flex flex-col justify-center items-center gap-[32px] ">
							<h1 className="relative text-[20px] xl:text-[60px] font-bold text-center">
								Tạo form nhanh và thu thập thông tin một cách dễ dàng
								<Image
									src={"/assets/images/HomePage/title-highlight-2.png"}
									width={181}
									height={12}
									className="hidden xl:inline absolute left-[150px] bottom-0 w-[181px] xl:h-[12px]"
									alt="highlight-text"
								/>
							</h1>
							<ParagraphNative
								className="w-full xl:w-[50%] text-[13px] xl:text-[20px] text-justify sm:text-center break-words"
								textContent="Không còn cách tiếp cận nhàn chán, dự án cho phép tạo form như một công cụ builder, nơi bạn có thể tùy chỉnh giao diện form cho mình"
							/>

							<Link
								href={"/login"}
								// urlNavigation="create-form"
								// textContent="Tạo một form miễn phí"
								className="!mt-[10px] !xl:mt-[50px] p-[6px_12px] flex  justify-center items-center gap-[.8rem] text-[1.8rem] text-[#ffffff] bg-[rgb(0_112_215)] opacity-[.95] hover:opacity-100 transition-colors duration-200 rounded-[.6rem]"
							>
								Tạo form miễn phí
							</Link>
						</DivNative>
						<DivNative className="h-max">
							<FeatureInfoV1
								image_sub_url="/assets/images/home/image_1.jpg"
								BeforeTextHighlight="Hỗ trợ nhiều loại input đa dạng"
								TextHighlight=""
								AfterTextHighlight=""
								ImageHighlight="/assets/images/HomePage/title-highlight-3.png"
								ImageRight="/assets/images/home/input_introduce.png"
								TextSub="Mỗi loại input sẽ cung cấp nhiều chắc năng khác nhau và chứa các cấu hình và validate dữ liệu khác nhau giúp cho bạn dễ dàng chọn thứ mình cần"
								Mode={{
									mode: "SLIDER",
									ImagePathArray: InnputImages,
								}}
								Postion={{ mode: "BOTTOM" }}
							/>
						</DivNative>
						<DivNative className="h-max">
							<FeatureInfoV1
								image_sub_url="/assets/images/home/image_2.jpg"
								position_header={"right"}
								BeforeTextHighlight="Cài đặt cấu hinh"
								TextHighlight=""
								AfterTextHighlight=""
								ImageHighlight="/assets/images/HomePage/title-highlight-3.png"
								ImageRight="/assets/images/home/input_config.png"
								TextSub="Mỗi loại input sẽ có nhiều cấu hình và thiếp lập khác nhau giúp bạn thuận tiện hơn trong việc sử dụng"
								Mode={{
									mode: "SLIDER",
									ImagePathArray: InnputImages,
								}}
								Postion={{ mode: "BOTTOM" }}
							/>
						</DivNative>

						<IntroduceDarkMode />

						<DivNative className="flex flex-col gap-[20px] h-max">
							<ImageAndText
								BeforeTextHighlight=""
								TextHighlight="Chia sẽ"
								AfterTextHighlight="form của bạn với mọi người"
								ImageHighlight="/assets/images/HomePage/title-highlight-4.png"
								TextSub="Khi bạn tạo form một link đường dẫn sẽ được tạo kèm, bạn hãy dùng đường dẫn này để gửi form của bạn cho mọi người."
								ImageRight=""
								Position={{ mode: "WRAPPER" }}
							/>
							<DivNative className="flex  flex-col xl:flex-row gap-[20px] h-max ">
								<DivNative className="w-full xl:w-[60%] ">
									<IconTextLink
										Icon={<Link2 className="text-pinkCustom" />}
										Title="Chia sẽ Link"
										TextSub={"Chia sẽ link form của bạn với mọi người."}
										LinkColorBg="bg-text-theme"
										LinkTextColor="text-color-section-theme font-medium"
										TextLink="tally.so/r/3qDpEY"
										LinkIcon={<ExternalLink />}
									/>
								</DivNative>
								<Image
									src={"/assets/images/home/share.png"}
									width={18}
									height={18}
									alt="icon"
									unoptimized={true}
									className="hidden xl:inline xl:w-[40%] h-[25rem]  object-contain rounded-3xl"
								/>
							</DivNative>
						</DivNative>

						<DivNative className="flex flex-col gap-[20px] h-max">
							<ImageAndText
								BeforeTextHighlight="Thống kê dữ liệu với "
								TextHighlight="Excel"
								AfterTextHighlight=""
								ImageHighlight="/assets/images/HomePage/title-highlight-4.png"
								TextSub="Dựa vào các phiếu trả lời trên form của bạn, website sẽ tổng hợp lại và export ra file Excel chứa thông tin các câu trả lời."
								Position={{ mode: "WRAPPER" }}
							/>
							<div className="w-full flex justify-center items-center">
								<Image
									src={"/assets/images/home/example_excel.png"}
									width={18}
									height={18}
									alt="icon"
									unoptimized={true}
									className="w-full xl:w-[80%]  h-[26rem] xl:h-[40rem] object-contain "
								/>

								<Image
									src={"/assets/images/home/excel.png"}
									width={18}
									height={18}
									alt="icon"
									unoptimized={true}
									className="hidden xl:inline w-[20%] h-[25rem]  object-contain rounded-3xl"
								/>
							</div>
						</DivNative>
					</main>
				</DivNative>
			</DivNative>
		</DivNative>
	);
};

export default HomePage;
