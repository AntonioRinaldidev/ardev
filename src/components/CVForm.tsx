'use client';
import React, { useState } from 'react';
import '@/styles/cvForm.css';
import SectionHeader from './SectionHeader';

interface Props {
	data: any;
	onChange: (data: any) => void;
}

export default function CVForm({ data, onChange }: Props) {
	const [activeSections, setActiveSections] = useState({
		personal: true,
		summary: true,
		experience: true,
		education: true,
		skills: true,
		languages: true,
	});

	const [closingSections, setClosingSections] = useState<{
		[key: string]: boolean;
	}>({});

	const toggleSection = (section: keyof typeof activeSections) => {
		if (activeSections[section]) {
			setClosingSections((prev) => ({ ...prev, [section]: true }));
			setTimeout(() => {
				setActiveSections((prev) => ({ ...prev, [section]: false }));
				setClosingSections((prev) => ({ ...prev, [section]: false }));
			}, 400);
		} else {
			setActiveSections((prev) => ({ ...prev, [section]: true }));
		}
	};

	const updateField = (section: string, field: string, value: any) => {
		onChange({ ...data, [section]: { ...data[section], [field]: value } });
	};

	const updateListField = (
		section: string,
		index: number,
		field: string,
		value: any
	) => {
		const updatedList = [...data[section]];
		updatedList[index][field] = value;
		onChange({ ...data, [section]: updatedList });
	};

	const addItem = (section: string, template: any) => {
		onChange({ ...data, [section]: [...data[section], template] });
	};

	const renderSection = (
		label: string,
		sectionKey: keyof typeof activeSections,
		content: JSX.Element
	) => (
		<>
			<SectionHeader
				label={label}
				sectionKey={sectionKey}
				isActive={activeSections[sectionKey]}
				onToggle={toggleSection}
			/>
			{(activeSections[sectionKey] || closingSections[sectionKey]) && (
				<div
					className={`section-content ${
						closingSections[sectionKey] ? 'fade-out' : 'fade-in'
					}`}>
					{content}
				</div>
			)}
		</>
	);

	return (
		<div className="cv-form">
			{renderSection(
				'Dati Personali',
				'personal',
				<>
					<input
						type="text"
						placeholder="Full Name"
						value={data.personal.fullName}
						onChange={(e) =>
							updateField('personal', 'fullName', e.target.value)
						}
					/>
					<input
						type="text"
						placeholder="Title"
						value={data.personal.title}
						onChange={(e) => updateField('personal', 'title', e.target.value)}
					/>
					<input
						type="email"
						placeholder="Email"
						value={data.personal.email}
						onChange={(e) => updateField('personal', 'email', e.target.value)}
					/>
					<input
						type="text"
						placeholder="Phone"
						value={data.personal.phone}
						onChange={(e) => updateField('personal', 'phone', e.target.value)}
					/>
					<input
						type="text"
						placeholder="Location"
						value={data.personal.location}
						onChange={(e) =>
							updateField('personal', 'location', e.target.value)
						}
					/>
					<input
						type="text"
						placeholder="GitHub"
						value={data.personal.github}
						onChange={(e) => updateField('personal', 'github', e.target.value)}
					/>
					<input
						type="text"
						placeholder="LinkedIn"
						value={data.personal.linkedin}
						onChange={(e) =>
							updateField('personal', 'linkedin', e.target.value)
						}
					/>
				</>
			)}

			{renderSection(
				'Profilo Personale',
				'summary',
				<textarea
					placeholder="Scrivi una breve descrizione professionale..."
					value={data.summary}
					onChange={(e) => onChange({ ...data, summary: e.target.value })}
				/>
			)}

			{renderSection(
				'Esperienza',
				'experience',
				<>
					{data.experience.map((exp: any, i: number) => (
						<div key={i}>
							<input
								type="text"
								placeholder="Role"
								value={exp.role}
								onChange={(e) =>
									updateListField('experience', i, 'role', e.target.value)
								}
							/>
							<input
								type="text"
								placeholder="Company"
								value={exp.company}
								onChange={(e) =>
									updateListField('experience', i, 'company', e.target.value)
								}
							/>
							<input
								type="text"
								placeholder="Location"
								value={exp.location}
								onChange={(e) =>
									updateListField('experience', i, 'location', e.target.value)
								}
							/>
							<input
								type="text"
								placeholder="From"
								value={exp.from}
								onChange={(e) =>
									updateListField('experience', i, 'from', e.target.value)
								}
							/>
							<input
								type="text"
								placeholder="To"
								value={exp.to}
								onChange={(e) =>
									updateListField('experience', i, 'to', e.target.value)
								}
							/>
							<textarea
								placeholder="Description"
								value={exp.description}
								onChange={(e) =>
									updateListField(
										'experience',
										i,
										'description',
										e.target.value
									)
								}
							/>
						</div>
					))}
					<button
						onClick={() =>
							addItem('experience', {
								role: '',
								company: '',
								location: '',
								from: '',
								to: '',
								description: '',
							})
						}>
						+ Add Experience
					</button>
				</>
			)}

			{renderSection(
				'Formazione',
				'education',
				<>
					{data.education.map((edu: any, i: number) => (
						<div key={i}>
							<input
								type="text"
								placeholder="Degree"
								value={edu.degree}
								onChange={(e) =>
									updateListField('education', i, 'degree', e.target.value)
								}
							/>
							<input
								type="text"
								placeholder="School"
								value={edu.school}
								onChange={(e) =>
									updateListField('education', i, 'school', e.target.value)
								}
							/>
							<input
								type="text"
								placeholder="Location"
								value={edu.location}
								onChange={(e) =>
									updateListField('education', i, 'location', e.target.value)
								}
							/>
							<input
								type="text"
								placeholder="From"
								value={edu.from}
								onChange={(e) =>
									updateListField('education', i, 'from', e.target.value)
								}
							/>
							<input
								type="text"
								placeholder="To"
								value={edu.to}
								onChange={(e) =>
									updateListField('education', i, 'to', e.target.value)
								}
							/>
						</div>
					))}
					<button
						onClick={() =>
							addItem('education', {
								degree: '',
								school: '',
								location: '',
								from: '',
								to: '',
							})
						}>
						+ Add Education
					</button>
				</>
			)}

			{renderSection(
				'Competenze',
				'skills',
				<>
					{data.skills.map((skill: string, i: number) => (
						<input
							key={i}
							type="text"
							placeholder={`Skill ${i + 1}`}
							value={skill}
							onChange={(e) => {
								const updated = [...data.skills];
								updated[i] = e.target.value;
								onChange({ ...data, skills: updated });
							}}
						/>
					))}
					<button
						onClick={() => onChange({ ...data, skills: [...data.skills, ''] })}>
						+ Add Skill
					</button>
				</>
			)}

			{renderSection(
				'Lingue',
				'languages',
				<>
					{data.languages.map((lang: any, i: number) => (
						<div key={i}>
							<input
								type="text"
								placeholder="Language"
								value={lang.language}
								onChange={(e) =>
									updateListField('languages', i, 'language', e.target.value)
								}
							/>
							<input
								type="text"
								placeholder="Level"
								value={lang.level}
								onChange={(e) =>
									updateListField('languages', i, 'level', e.target.value)
								}
							/>
						</div>
					))}
					<button
						onClick={() => addItem('languages', { language: '', level: '' })}>
						+ Add Language
					</button>
				</>
			)}
		</div>
	);
}
