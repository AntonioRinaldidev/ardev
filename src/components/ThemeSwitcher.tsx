'use client';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { cycleTheme, type Theme } from '@/store/themeSlice';
import { motion, AnimatePresence } from 'framer-motion';
import {
	FaLeaf,
	FaBolt,
	FaRobot,
	FaGem,
	FaRegCircle,
	FaCircle,
	FaSnowflake,
} from 'react-icons/fa';

const themeIcons: Record<Theme, JSX.Element> = {
	'artic-deep': <FaSnowflake />,
	violet: <FaGem />,
	cyber: <FaRobot />,
	mint: <FaLeaf />,
	neon: <FaBolt />,
	minimal: <FaRegCircle />,
	'dark-minimal': <FaCircle />,
};

export default function ThemeSwitcher() {
	const dispatch = useAppDispatch();
	const { currentTheme } = useAppSelector((state) => state.theme);

	return (
		<div className='theme-switcher'>
			<motion.button
				whileTap={{ scale: 0.9 }}
				onClick={() => dispatch(cycleTheme())}
				className='theme-button'
				title={`Theme: ${currentTheme}`}>
				<AnimatePresence mode='wait'>
					<motion.span
						key={currentTheme}
						className='icon'
						initial={{ y: 10, opacity: 0, rotate: -45 }}
						animate={{ y: 0, opacity: 1, rotate: 0 }}
						exit={{ y: -10, opacity: 0, rotate: 45 }}
						transition={{ duration: 0.2 }}>
						{themeIcons[currentTheme]}
					</motion.span>
				</AnimatePresence>
			</motion.button>
		</div>
	);
}
