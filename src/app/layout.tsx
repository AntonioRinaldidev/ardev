import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // deve essere qui, non dentro page.tsx

export const dynamic = 'force-dynamic';
import AppWrapper from '@/components/AppWrapper';
import { cookies } from 'next/headers';
import ParticlesBackground from '@/components/ParticlesBackground';
import { ThemeInitWrapper } from '@/components/ThemeInitWrapper';
const inter = Inter({ subsets: ['latin'] });
const themes = ['violet', 'cyber', 'mint', 'neon', 'minimal'];

export const metadata: Metadata = {
	title: 'Antonio Rinaldi – Web & Mobile Developer',
	description:
		'Portfolio personale di Antonio Rinaldi, ingegnere informatico con focus su React, Next.js, AI e Computer Vision.',
	keywords: [
		'Antonio Rinaldi',
		'Web Developer',
		'React',
		'Next.js',
		'Frontend',
		'Full Stack',
		'Computer Vision',
		'AI',
		'Portfolio',
		'Italy',
		'Vallo Della Lucania',
		'Padova',
	],
	authors: [{ name: 'Antonio Rinaldi', url: 'https://antoniorinaldidev.com' }],
	creator: 'Antonio Rinaldi',
	metadataBase: new URL('https://antoniorinaldidev.com'),
	openGraph: {
		title: 'Antonio Rinaldi – Portfolio',
		description:
			'Sviluppo web e mobile, AI & Robotics. Guarda i miei progetti e contattami per collaborazioni.',
		url: 'https://antoniorinaldidev.com',
		siteName: 'Antonio Rinaldi',
		type: 'website',
		locale: 'it_IT',
		images: [
			{
				url: 'https://antoniorinaldidev.com/og-image-v2.jpg',
				width: 1024,
				height: 1024,
			},
		],
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = cookies();
	const cookieTheme = (await cookieStore).get('theme')?.value || 'violet';
	const themeClass = themes.includes(cookieTheme) ? cookieTheme : 'violet';

	return (
		<html
			lang="en"
			className={`${themeClass}`}>
			<body
				className={inter.className}
				suppressHydrationWarning>
				<ParticlesBackground />
				<AppWrapper>{children}</AppWrapper>
			</body>
		</html>
	);
}
