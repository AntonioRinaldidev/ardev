import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import ParticlesBackground from "@/components/ParticlesBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "JKryson",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<ParticlesBackground />
				<main>{children}</main>
			</body>
		</html>
	);
}
