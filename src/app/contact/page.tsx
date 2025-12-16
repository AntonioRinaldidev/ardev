'use client';
import React, { useEffect, useState } from 'react';
import './contact.css';
import { sendContactFormAsync } from '@/services/userService';
import AnimatedButton from '@/components/AnimatedButton';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
	FaUser,
	FaEnvelope,
	FaTag,
	FaComment,
	FaPaperPlane,
	FaCheckCircle,
	FaExclamationTriangle,
	FaArrowLeft,
} from 'react-icons/fa';
import Stepper, { Step } from '@/components/StepContact';
import Card from '@/components/Card';

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');
	const router = useRouter();

	const [currentStep, setCurrentStep] = useState(1);

	// Funzione per validare il campo corrente
	const validateCurrentStep = (
		step: number,
		data: typeof formData
	): boolean => {
		switch (step) {
			case 1:
				return data.name.trim().length > 0;
			case 2:
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return data.email.trim().length > 0 && emailRegex.test(data.email);
			case 3:
				return data.subject.trim().length > 0;
			case 4:
				return data.message.trim().length > 0;
			default:
				return false;
		}
	};

	const isStepValid = validateCurrentStep(currentStep, formData);
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSuccessMessage('');
		setErrorMessage('');

		try {
			const response = await sendContactFormAsync(formData);
			if (!response.isSuccess) {
				throw new Error('Failed to send email');
			}
			setSuccessMessage('Thank you! Your request has been sent.');
			setFormData({ name: '', email: '', subject: '', message: '' });
		} catch (error) {
			console.error('Failed to send email:', error);
			setErrorMessage('Failed to send email. Please try again later.');
		} finally {
			setIsSubmitting(false);
			setTimeout(() => {
				setSuccessMessage('');
				setErrorMessage('');
			}, 3000);
		}
	};

	const inputVariants = {
		hidden: { opacity: 0, x: 500 },
		visible: { opacity: 1, x: 0 },
	};

	return (
		<section className="contact-section">
			{/* Header with back button */}
			<div className="contact-header">
				<AnimatedButton
					variant="primary"
					text="Back to Home"
					onClick={() => router.push('/')}
				/>
			</div>

			<Card>
				<motion.div
					className="contact-main-content"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, ease: 'easeOut' }}>
					{/* Header section */}
					<div className="contact-content-header">
						<motion.h1
							className="contact-title"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}>
							Get In Touch
							<div className="contact-title-underline"></div>
						</motion.h1>

						<motion.p
							className="contact-subtitle"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}>
							Ready to bring your project to life? Let&lsquo;s discuss your
							ideas and create something amazing together.
						</motion.p>
					</div>

					{/* Contact form */}
					<Stepper
						className="contact-stepper"
						initialStep={1}
						onStepChange={(step) => {
							setCurrentStep(step);
						}}
						onFinalStepCompleted={() => handleSubmit({ preventDefault: () => {} } as React.FormEvent)}
						backButtonText="Previous"
						nextButtonText="Next"
						nextButtonProps={{
							disabled: !isStepValid,
							className: !isStepValid ? 'next-button-disabled' : '',
						}}>
						<Step>
							<p>First things first...</p>
							<span className="step-subtitle">
								Tell me your name so I know who I&lsquo;m working with
							</span>

							<motion.div
								className="form-field"
								variants={inputVariants}
								initial="hidden"
								animate="visible"
								transition={{ duration: 0.5, delay: 0.5 }}>
								<div className="field-icon">
									<FaUser />
								</div>
								<input
									type="text"
									name="name"
									placeholder="Your Name"
									value={formData.name}
									onChange={handleChange}
									required
									className="form-input"
								/>
							</motion.div>
						</Step>
						<Step>
							<p>How can I reach you?</p>
							<span className="step-subtitle">
								Your email address for project updates and replies
							</span>
							<motion.div
								className="form-field"
								variants={inputVariants}
								initial="hidden"
								animate="visible"
								transition={{ duration: 0.5, delay: 0.6 }}>
								<div className="field-icon">
									<FaEnvelope />
								</div>
								<input
									type="email"
									name="email"
									placeholder="Your Email"
									value={formData.email}
									onChange={handleChange}
									required
									className="form-input"
								/>
							</motion.div>
						</Step>
						<Step>
							<p>What is your mission?</p>
							<span className="step-subtitle">
								A brief subject line to summarize your project
							</span>
							<motion.div
								className="form-field"
								variants={inputVariants}
								initial="hidden"
								animate="visible"
								transition={{ duration: 0.5, delay: 0.7 }}>
								<div className="field-icon">
									<FaTag />
								</div>
								<input
									type="text"
									name="subject"
									placeholder="Subject"
									value={formData.subject}
									onChange={handleChange}
									required
									className="form-input"
								/>
							</motion.div>
						</Step>
						<Step>
							<p>Paint me the picture</p>
							<span className="step-subtitle">
								Describe your vision, goals, and project details
							</span>
							<motion.div
								className="form-field message-field"
								variants={inputVariants}
								initial="hidden"
								animate="visible"
								transition={{ duration: 0.5, delay: 0.8 }}>
								<div className="field-icon">
									<FaComment />
								</div>
								<textarea
									name="message"
									placeholder="Tell me about your project..."
									rows={6}
									value={formData.message}
									onChange={handleChange}
									required
									className="form-textarea"
								/>
							</motion.div>

							{/* Success/Error messages */}
							{successMessage && (
								<motion.div
									className="message-alert success-message"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.4 }}>
									<FaCheckCircle className="message-icon" />
									{successMessage}
								</motion.div>
							)}

							{errorMessage && (
								<motion.div
									className="message-alert error-message"
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{ duration: 0.4 }}>
									<FaExclamationTriangle className="message-icon" />
									{errorMessage}
								</motion.div>
							)}
						</Step>
					</Stepper>
					
				</motion.div>
				</Card>
			
		</section>
	);
};

export default ContactPage;
