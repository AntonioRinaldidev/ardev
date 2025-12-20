import React, {
	useState,
	Children,
	useRef,
	useLayoutEffect,
	HTMLAttributes,
	ReactNode,
} from 'react';
import { motion, AnimatePresence, Variants } from 'motion/react';

import '@/styles/Stepper.css';
import AnimatedButton from './AnimatedButton';

interface StepperProps extends HTMLAttributes<HTMLDivElement> {
	children: ReactNode;
	initialStep?: number;
	onStepChange?: (step: number) => void;
	onFinalStepCompleted?: () => void;
	stepCircleContainerClassName?: string;
	stepContainerClassName?: string;
	contentClassName?: string;
	footerClassName?: string;
	backButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
	nextButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
	backButtonText?: string;
	nextButtonText?: string;
	disableStepIndicators?: boolean;
	renderStepIndicator?: (props: RenderStepIndicatorProps) => ReactNode;
}

interface RenderStepIndicatorProps {
	step: number;
	currentStep: number;
	onStepClick: (clicked: number) => void;
}

export default function Stepper({
	children,
	initialStep = 1,
	onStepChange = () => {},
	onFinalStepCompleted = () => {},
	stepCircleContainerClassName = '',
	stepContainerClassName = '',
	contentClassName = '',
	footerClassName = '',
	backButtonProps = {},
	nextButtonProps = {},
	backButtonText = 'Back',
	nextButtonText = 'Continue',
	disableStepIndicators = false,
	renderStepIndicator,
	...rest
}: Readonly<StepperProps>) {
	const [currentStep, setCurrentStep] = useState<number>(initialStep);
	const [direction, setDirection] = useState<number>(0);
	const stepsArray = Children.toArray(children);
	const totalSteps = stepsArray.length;
	const isCompleted = currentStep > totalSteps;
	const isLastStep = currentStep === totalSteps;

	const updateStep = (newStep: number) => {
		setCurrentStep(newStep);
		if (newStep > totalSteps) {
			onFinalStepCompleted();
		} else {
			onStepChange(newStep);
		}
	};

	const handleBack = () => {
		if (currentStep > 1) {
			setDirection(-1);
			updateStep(currentStep - 1);
		}
	};

	const handleNext = () => {
		if (!isLastStep) {
			setDirection(1);
			updateStep(currentStep + 1);
		}
	};

	const handleComplete = () => {
		setDirection(1);
		updateStep(totalSteps + 1);
	};

	return (
		<div className='outer-container' {...rest}>
			<div className={`step-circle-container ${stepCircleContainerClassName}`}>
				<div className={`step-indicator-row ${stepContainerClassName}`}>
					{stepsArray.map((_, index) => {
						const stepNumber = index + 1;
						const isNotLastStep = index < totalSteps - 1;
						return (
							<React.Fragment key={stepNumber}>
								{renderStepIndicator ? (
									renderStepIndicator({
										step: stepNumber,
										currentStep,
										onStepClick: (clicked) => {
											setDirection(clicked > currentStep ? 1 : -1);
											updateStep(clicked);
										},
									})
								) : (
									<StepIndicator
										step={stepNumber}
										disableStepIndicators={disableStepIndicators}
										currentStep={currentStep}
										onClickStep={(clicked) => {
											setDirection(clicked > currentStep ? 1 : -1);
											updateStep(clicked);
										}}
									/>
								)}
								{isNotLastStep && (
									<StepConnector isComplete={currentStep > stepNumber} />
								)}
							</React.Fragment>
						);
					})}
				</div>

				<StepContentWrapper
					isCompleted={isCompleted}
					currentStep={currentStep}
					direction={direction}
					className={`step-content-default ${contentClassName}`}>
					{stepsArray[currentStep - 1]}
				</StepContentWrapper>

				{!isCompleted && (
					<div className={`footer-container ${footerClassName}`}>
						<div
							className={`footer-nav ${currentStep !== 1 ? 'spread' : 'end'}`}>
							{currentStep !== 1 && (
								<AnimatedButton
									onClick={handleBack}
									text={backButtonText}
									variant='secondary'
									className={currentStep === 1 ? 'inactive' : ''}
								/>
							)}
							<AnimatedButton
								onClick={isLastStep ? handleComplete : handleNext}
								text={isLastStep ? 'Complete' : nextButtonText}
								variant='primary'
								className={nextButtonProps?.disabled ? 'btn-disabled' : ''}
								disabled={nextButtonProps?.disabled}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

interface StepContentWrapperProps {
	isCompleted: boolean;
	currentStep: number;
	direction: number;
	children: ReactNode;
	className?: string;
}

function StepContentWrapper({
	isCompleted,
	currentStep,
	direction,
	children,
	className,
}: StepContentWrapperProps) {
	const [parentHeight, setParentHeight] = useState<number>(0);

	return (
		<motion.div
			className={className}
			style={{ position: 'relative' }}
			transition={{ type: 'spring', duration: 0.4 }}>
			<AnimatePresence initial={false} mode='sync' custom={direction}>
				{!isCompleted && (
					<SlideTransition
						key={currentStep}
						direction={direction}
						onHeightReady={(h) => setParentHeight(h)}>
						{children}
					</SlideTransition>
				)}
			</AnimatePresence>
		</motion.div>
	);
}

interface SlideTransitionProps {
	children: ReactNode;
	direction: number;
	onHeightReady: (h: number) => void;
}

function SlideTransition({
	children,
	direction,
	onHeightReady,
}: SlideTransitionProps) {
	const containerRef = useRef<HTMLDivElement | null>(null);

	useLayoutEffect(() => {
		if (containerRef.current) {
			onHeightReady(containerRef.current.offsetHeight);
		}
	}, [children, onHeightReady]);

	return (
		<motion.div
			ref={containerRef}
			custom={direction}
			variants={stepVariants}
			initial='enter'
			animate='center'
			exit='exit'
			transition={{
				duration: 0.6,
				ease: [0.25, 0.8, 0.25, 1], // Portfolio easing
			}}
			style={{ position: 'absolute', left: 0, right: 0, top: 0 }}>
			{children}
		</motion.div>
	);
}

// Enhanced slide animations
const stepVariants: Variants = {
	enter: (dir: number) => ({
		x: dir >= 0 ? '100%' : '-100%',
		opacity: 0,
		scale: 0.95,
	}),
	center: {
		x: '0%',
		opacity: 1,
		scale: 1,
	},
	exit: (dir: number) => ({
		x: dir >= 0 ? '-100%' : '100%',
		opacity: 0,
		scale: 0.95,
	}),
};

interface StepProps {
	children: ReactNode;
}

export function Step({ children }: StepProps): JSX.Element {
	return <div className='step-default'>{children}</div>;
}

interface StepIndicatorProps {
	step: number;
	currentStep: number;
	onClickStep: (step: number) => void;
	disableStepIndicators?: boolean;
}

function StepIndicator({
	step,
	currentStep,
	onClickStep,
	disableStepIndicators,
}: StepIndicatorProps) {
	const status =
		currentStep === step
			? 'active'
			: currentStep < step
			? 'inactive'
			: 'complete';

	const handleClick = () => {
		if (disableStepIndicators) return;

		if (step < currentStep) {
			onClickStep(step);
			return;
		}
		if (step === currentStep) {
			return;
		}
		if (step > currentStep) {
			return;
		}
	};

	return (
		<motion.div
			onClick={handleClick}
			className='step-indicator'
			whileHover={{ scale: 1.05 }}
			whileTap={{ scale: 0.95 }}
			initial={false}>
			<motion.div
				variants={{
					inactive: {
						scale: 1,
						backgroundColor: 'var(--color-bg-secondary)',
						borderColor: 'rgba(255, 255, 255, 0.1)',
						color: 'var(--color-text-secondary)',
					},
					active: {
						scale: 1,
						backgroundColor: 'var(--color-primary)',
						borderColor: 'var(--color-primary)',
						color: '#ffffff',
					},
					complete: {
						scale: 1,
						backgroundColor: 'var(--color-link)',
						borderColor: 'var(--color-link)',
						color: '#ffffff',
					},
				}}
				animate={status}
				transition={{
					duration: 0.4,
					ease: [0.25, 0.8, 0.25, 1],
				}}
				className='step-indicator-inner'
				data-status={status}>
				{status === 'complete' ? (
					<CheckIcon className='check-icon' />
				) : status === 'active' ? (
					<div className='active-dot' />
				) : (
					<span className='step-number'>{step}</span>
				)}
			</motion.div>
		</motion.div>
	);
}

interface StepConnectorProps {
	isComplete: boolean;
}

function StepConnector({ isComplete }: StepConnectorProps) {
	return (
		<div className='step-connector'>
			<motion.div
				className='step-connector-inner'
				initial={{ width: 0 }}
				animate={{
					width: isComplete ? '100%' : 0,
				}}
				transition={{
					duration: 0.6,
					ease: [0.25, 0.8, 0.25, 1],
					delay: isComplete ? 0.2 : 0,
				}}
			/>
		</div>
	);
}

interface CheckIconProps extends React.SVGProps<SVGSVGElement> {}

function CheckIcon(props: CheckIconProps) {
	return (
		<svg
			{...props}
			fill='none'
			stroke='currentColor'
			strokeWidth={3}
			viewBox='0 0 24 24'>
			<motion.path
				initial={{ pathLength: 0, opacity: 0 }}
				animate={{ pathLength: 1, opacity: 1 }}
				transition={{
					delay: 0.2,
					type: 'tween',
					ease: [0.25, 0.8, 0.25, 1],
					duration: 0.6,
				}}
				strokeLinecap='round'
				strokeLinejoin='round'
				d='M5 13l4 4L19 7'
			/>
		</svg>
	);
}
