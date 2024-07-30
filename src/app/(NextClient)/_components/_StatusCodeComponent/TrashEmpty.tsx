import Image from "next/image";
import React from "react";

const TrashEmpty = () => {
	return (
		<div className="w-full min-h-[48rem] xl:min-h-[60rem] h-full flex flex-col items-center justify-center gap-[4rem]">
			<Image
				src={"/assets/images/icon/form/form_delete_empty.png"}
				width={200}
				height={200}
				alt="logo"
				className="w-[20rem] h-[20rem]"
			/>
			<p className="text-[2rem] text-text-theme">Danh sách xóa hiện đang trống</p>
		</div>
	);
};

export default TrashEmpty;
