'use client';
import React from 'react';
import '@/styles/cvForm.css';

interface Props {
	data: any;
	onChange: (data: any) => void;
}

export default function CVForm({ data, onChange }: Props) {
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

	return (
		<div className="cv-form">
			<h2>Dati Personali</h2>
			<input
				type="text"
				placeholder="Full Name"
				value={data.personal.fullName}
				onChange={(e) => updateField('personal', 'fullName', e.target.value)}
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
				onChange={(e) => updateField('personal', 'location', e.target.value)}
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
				onChange={(e) => updateField('personal', 'linkedin', e.target.value)}
			/>

			<hr />

			<h2>Profilo Personale</h2>
			<textarea
				placeholder="Scrivi una breve descrizione professionale..."
				value={data.summary}
				onChange={(e) => onChange({ ...data, summary: e.target.value })}
			/>

			<hr />

			<h2>Esperienza</h2>
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
							updateListField('experience', i, 'description', e.target.value)
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

			<hr />

			<h2>Formazione</h2>
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

			<hr />

			<h2>Competenze</h2>
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

			<hr />

			<h2>Lingue</h2>
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
			<button onClick={() => addItem('languages', { language: '', level: '' })}>
				+ Add Language
			</button>
		</div>
	);
}
