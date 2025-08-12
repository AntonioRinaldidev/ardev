// hooks/useIsMobile.ts
'use client';
import { useState, useEffect } from 'react';

export const useIsMobile = (breakpoint: number = 768) => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIsMobile = () => {
			const windowWidth = window.innerWidth;
			const hasTouchScreen = 'ontouchstart' in window;
			const isMobileDevice = windowWidth <= breakpoint || hasTouchScreen;
			setIsMobile(isMobileDevice);
		};

		// Check iniziale
		checkIsMobile();

		// Event listener per resize
		window.addEventListener('resize', checkIsMobile);

		return () => window.removeEventListener('resize', checkIsMobile);
	}, [breakpoint]);

	return isMobile;
};

// Versione più avanzata con più informazioni
export const useDeviceInfo = (breakpoint: number = 768) => {
	const [deviceInfo, setDeviceInfo] = useState({
		isMobile: false,
		isTablet: false,
		isDesktop: false,
		screenWidth: 0,
		hasTouchScreen: false,
		userAgent: '',
	});

	useEffect(() => {
		const checkDevice = () => {
			const windowWidth = window.innerWidth;
			const hasTouchScreen = 'ontouchstart' in window;
			const userAgent = navigator.userAgent;

			const isMobile = windowWidth <= breakpoint || hasTouchScreen;
			const isTablet =
				windowWidth > breakpoint && windowWidth <= 1024 && hasTouchScreen;
			const isDesktop = windowWidth > 1024 && !hasTouchScreen;

			setDeviceInfo({
				isMobile,
				isTablet,
				isDesktop,
				screenWidth: windowWidth,
				hasTouchScreen,
				userAgent,
			});
		};

		checkDevice();
		window.addEventListener('resize', checkDevice);

		return () => window.removeEventListener('resize', checkDevice);
	}, [breakpoint]);

	return deviceInfo;
};
