import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // deve essere qui, non dentro page.tsx

export const dynamic = 'force-dynamic';
import ParticlesBackground from '@/components/ParticlesBackground';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'AntonioRinaldiDev',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={inter.className}>
			<body suppressHydrationWarning={true}>
				<ParticlesBackground />

				<main>{children}</main>
			</body>
		</html>
	);
}
