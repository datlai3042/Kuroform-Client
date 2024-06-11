import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "./(NextClient)/_components/provider/ReactQueryProvider";
import ReduxProvider from "./_lib/redux/ReduxProvider";
import AppProvider from "./(NextClient)/_components/AppProvider";
import CheckPathName from "./(NextClient)/_components/ui/CheckPathName";
import SidebarContextProvider from "./(NextClient)/dashboard/SidebarContext";
import { Toaster } from "@/components/ui/toaster";
import DivNative from "./(NextClient)/_components/ui/NativeHtml/DivNative";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Form builder",
	description: "Generated by create next app",
	icons: {
		icon: "/icon_core.png",
	},
};

type TProps = {
	children: React.ReactNode;
};

export default function RootLayout(props: TProps) {
	return (
		<html lang="vi" suppressHydrationWarning={true}>
			<head>
				<link rel="icon" type="image/x-icon" href="/icon_core.png" />
			</head>
			<body className={inter.className}>
				<ReduxProvider>
					<ReactQueryProvider>
						<SidebarContextProvider>
							<AppProvider>
								{props.children}
								<CheckPathName />
							</AppProvider>
							<DivNative className="fixed bottom z-[100000]">
								<Toaster />
							</DivNative>
						</SidebarContextProvider>
					</ReactQueryProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
