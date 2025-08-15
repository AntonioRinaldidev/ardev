'use client';
import React, { useState } from 'react';
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
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
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

			{/* Main content wrapper */}
			<div className="contact-wrapper">
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
					<motion.form
						onSubmit={handleSubmit}
						className="contact-form"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.4 }}>
						{/* Name field */}
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

						{/* Email field */}
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

						{/* Subject field */}
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

						{/* Message field */}
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

						{/* Submit button */}
						<motion.button
							type="submit"
							disabled={isSubmitting}
							className="contact-submit-btn"
							variants={inputVariants}
							initial="hidden"
							animate="visible"
							transition={{ duration: 0.5, delay: 0.9 }}
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}>
							<span className="submit-btn-content">
								<FaPaperPlane className="submit-btn-icon" />
								{isSubmitting ? 'Sending...' : 'Send Message'}
							</span>
						</motion.button>

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
					</motion.form>
				</motion.div>
			</div>
		</section>
	);
};

export default ContactPage;
