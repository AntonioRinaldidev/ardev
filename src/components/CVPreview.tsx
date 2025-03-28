'use client';
import React from 'react';
import { CvData } from '@/types/cvData';
import '@/styles/cvPreview.css';
import CVPdfDownload from './CVDownload';

export default function CVPreview({ data }: { data: CvData }) {
	return (
		<div className="cv-generator-preview">
			<CVPdfDownload data={data} />

			<div className="cv-preview-layout">
				{/* Colonna sinistra */}
				<div className="cv-left">
					<div className="cv-header">
						<h2 className="cv-name">{data.personal.fullName}</h2>
						<p className="cv-title">{data.personal.title}</p>
						<p className="cv-contact">
							📧 {data.personal.email} | 📍 {data.personal.location} | 🔗{' '}
							{data.personal.github} | 💼 {data.personal.linkedin}
						</p>
					</div>

					<div className="cv-section">
						<h3 className="cv-section-title">Summary</h3>
						<p className="cv-entry-text">{data.summary}</p>
					</div>

					<div className="cv-section">
						<h3 className="cv-section-title">Experience</h3>
						{data.experience.map((exp, i) => (
							<div
								key={i}
								className="cv-entry timeline-box">
								<h4 className="cv-entry-title">
									{exp.role} @ {exp.company}
								</h4>
								<p className="cv-entry-text">
									{exp.location} | {exp.from} - {exp.to}
								</p>
								<p className="cv-entry-text">{exp.description}</p>
							</div>
						))}
					</div>

					<div className="cv-section">
						<h3 className="cv-section-title">Education</h3>
						{data.education.map((edu, i) => (
							<div
								key={i}
								className="cv-entry timeline-box">
								<h4 className="cv-entry-title">
									{edu.degree} @ {edu.school}
								</h4>
								<p className="cv-entry-text">
									{edu.location} | {edu.from} - {edu.to}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* Colonna destra */}
				<div className="cv-right">
					<div className="cv-section">
						<h3 className="cv-section-title">Skills</h3>
						<div className="cv-skill-group">
							{data.skills.map((skill, i) => (
								<span
									key={i}
									className="cv-skill-pill">
									{skill}
								</span>
							))}
						</div>
					</div>

					<div className="cv-section">
						<h3 className="cv-section-title">Languages</h3>
						{data.languages.map((lang, i) => (
							<div
								key={i}
								className="cv-entry timeline-box">
								<h4 className="cv-entry-title">{lang.language}</h4>
								<p className="cv-entry-text">Level: {lang.level}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
