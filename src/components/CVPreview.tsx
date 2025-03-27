'use client';
import React from 'react';
import { CvData } from '@/types/cvData';
import '@/styles/cvPreview.css';
import CVPdfDownload from './CVDownload';

export default function CVPreview({ data }: { data: CvData }) {
	return (
		<div className="cv-generator-preview">
			{/* Bottone per scaricare il PDF */}

			<CVPdfDownload data={data} />

			{/* Preview visiva sulla pagina */}
			<div className="cv-preview">
				<div className="cv-header">
					<h2 className="cv-name">{data.personal.fullName}</h2>
					<p className="cv-title">{data.personal.title}</p>
					<p className="cv-contact">
						📧 {data.personal.email} | 📍 {data.personal.location} | 🔗{' '}
						{data.personal.github} | 💼 {data.personal.linkedin}
					</p>
				</div>

				<div className="cv-section">
					<h3>Summary</h3>
					<p>{data.summary}</p>
				</div>

				<div className="cv-section">
					<h3>Experience</h3>
					{data.experience.map((exp, index) => (
						<div
							key={index}
							className="cv-entry">
							<h4>
								{exp.role} @ {exp.company}
							</h4>
							<p>
								{exp.location} | {exp.from} - {exp.to}
							</p>
							<p>{exp.description}</p>
						</div>
					))}
				</div>

				<div className="cv-section">
					<h3>Education</h3>
					{data.education.map((edu, index) => (
						<div
							key={index}
							className="cv-entry">
							<h4>
								{edu.degree} @ {edu.school}
							</h4>
							<p>
								{edu.location} | {edu.from} - {edu.to}
							</p>
						</div>
					))}
				</div>

				<div className="cv-section">
					<h3>Skills</h3>
					<ul className="cv-list">
						{data.skills.map((skill, index) => (
							<li key={index}>{skill}</li>
						))}
					</ul>
				</div>

				<div className="cv-section">
					<h3>Languages</h3>
					<ul className="cv-list">
						{data.languages.map((lang, index) => (
							<li key={index}>
								{lang.language} - {lang.level}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
