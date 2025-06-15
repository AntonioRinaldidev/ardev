'use client';
import React, { useEffect } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '@/styles/footer.css';

const Footer = () => {
	return (
		<footer className="custom-footer">
			<div className="footer-container">
				<p className="footer-text">
					© {new Date().getFullYear()} Antonio Rinaldi
				</p>
				<div className="footer-links">
					<a
						href="https://github.com/antoniorinaldidev"
						target="_blank"
						rel="noopener noreferrer"
						title="GitHub">
						<FaGithub />
					</a>
					<a
						href="https://linkedin.com/in/antonio-rinaldi-991555294"
						target="_blank"
						rel="noopener noreferrer"
						title="LinkedIn">
						<FaLinkedin />
					</a>
					<a
						href="mailto:a.rinaldi.dev@gmail.com"
						title="Email">
						<FaEnvelope />
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
