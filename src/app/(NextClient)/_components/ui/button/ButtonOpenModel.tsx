"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoginForm from "../../Model/LoginForm";

type TProps = {
	ModelComponent: React.ComponentType<{ onClose: (state: boolean) => void }>;
	ContentButton: string;
};

const ButtonOpenModel = (props: TProps) => {
	const { ModelComponent, ContentButton } = props;

	const [openModel, setOpenModel] = useState<boolean>(false);

	return (
		<>
			<button onClick={() => setOpenModel(true)}>{ContentButton}</button>
			{openModel && <ModelComponent onClose={setOpenModel} />}
		</>
	);
};

export default ButtonOpenModel;
