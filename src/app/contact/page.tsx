'use client';
import React, { useEffect, useState } from 'react';
import './contact.css';
import { sendContactFormAsync } from '@/services/userService';
import AnimatedButton from '@/components/AnimatedButton';
import { useRouter } from 'next/navigation';



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


	return (
		<section className="contact-section">
			<div className="contact-header">
				<AnimatedButton
					variant="primary"
					text="Back to Home"
					onClick={() => router.push('/')}
				/>
			</div>

			<div className="contact-wrapper">
				<div className="contact-main-content">
					<h1 className="contact-title">Request a Quote</h1>
					<form
						onSubmit={handleSubmit}
						className="contact-form">
						<input
							type="text"
							name="name"
							placeholder="Your Name"
							value={formData.name}
							onChange={handleChange}
							required
						/>
						<input
							type="email"
							name="email"
							placeholder="Your Email"
							value={formData.email}
							onChange={handleChange}
							required
						/>
						<input
							type="text"
							name="subject"
							placeholder="Subject"
							value={formData.subject}
							onChange={handleChange}
							required
						/>
						<textarea
							name="message"
							placeholder="Write your message here..."
							rows={6}
							value={formData.message}
							onChange={handleChange}
							required></textarea>
						<button
							type="submit"
							disabled={isSubmitting}>
							{isSubmitting ? 'Sending...' : 'Send Request'}
						</button>

						{successMessage && (
							<p className="success-message">{successMessage}</p>
						)}
						{errorMessage && <p className="error-message">{errorMessage}</p>}
					</form>
				</div>
			</div>
		</section>
	);
};

export default ContactPage;
