// app/contact/page.tsx
'use client';
import React, { useState } from 'react';
import './contact.css';
import { sendContactFormAsync } from '@/services/userService';

const ContactPage = () => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		subject: '',
		message: '',
	});

	const [isSubmitting, setIsSubmitting] = useState(false);
	const [successMessage, setSuccessMessage] = useState('');

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSuccessMessage('');

		try {
			const response = await sendContactFormAsync(formData);
			if (!response.isSuccess) {
				throw new Error('Failed to send email');
			} else if (response.isSuccess) {
				console.log('Email sent');
			}
		} catch (error) {
			console.error('Failed to send email:', error);
		}
		setTimeout(() => {
			setIsSubmitting(false);
			setSuccessMessage('Thank you! Your request has been sent.');
			setFormData({ name: '', email: '', subject: '', message: '' });
		}, 1500);
	};

	return (
		<div className='contact-container'>
			<h1 className='contact-title'>Request a Quote</h1>
			<form onSubmit={handleSubmit} className='contact-form'>
				<input
					type='text'
					name='name'
					placeholder='Your Name'
					value={formData.name}
					onChange={handleChange}
					required
				/>
				<input
					type='email'
					name='email'
					placeholder='Your Email'
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<input
					type='text'
					name='subject'
					placeholder='Subject'
					value={formData.subject}
					onChange={handleChange}
					required
				/>
				<textarea
					name='message'
					placeholder='Write your message here...'
					rows={6}
					value={formData.message}
					onChange={handleChange}
					required></textarea>
				<button type='submit' disabled={isSubmitting}>
					{isSubmitting ? 'Sending...' : 'Send Request'}
				</button>
				{successMessage && <p className='success-message'>{successMessage}</p>}
			</form>
		</div>
	);
};

export default ContactPage;
