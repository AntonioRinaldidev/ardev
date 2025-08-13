import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // deve essere qui, non dentro page.tsx

export const dynamic = 'force-dynamic';
import ReduxProvider from '@/components/ReduxProvider';
import { LenisProvider } from '@/providers/LenisProvider';
import AppWrapper from '@/components/AppWrapper';
import ParticlesBackground from '@/components/ParticlesBackground';

const inter = Inter({ subsets: ['latin'] });
const themes = ['violet', 'cyber', 'mint', 'neon', 'minimal'];

// Esporta viewport separatamente
export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	viewportFit: 'cover',
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: '#000000' },
		{ media: '(prefers-color-scheme: dark)', color: '#000000' },
	],
};

// Metadata senza viewport
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

	appleWebApp: {
		capable: true,
		statusBarStyle: 'black-translucent',
		title: 'Antonio Rinaldi Portfolio',
		startupImage: [
			{
				url: '/apple-touch-startup-image-768x1004.png',
				media: '(device-width: 768px) and (device-height: 1024px)',
			},
		],
	},
	formatDetection: {
		telephone: false,
	},
	other: {
		// Meta tags aggiuntivi per iOS 18+
		'mobile-web-app-capable': 'yes',
		'apple-mobile-web-app-capable': 'yes',
		'apple-mobile-web-app-status-bar-style': 'black-translucent',
	},
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
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body
				className={inter.className}
				suppressHydrationWarning>
				<ReduxProvider>
					<LenisProvider>
						<ParticlesBackground />
						<AppWrapper>{children}</AppWrapper>
					</LenisProvider>
				</ReduxProvider>
			</body>
		</html>
	);
}
