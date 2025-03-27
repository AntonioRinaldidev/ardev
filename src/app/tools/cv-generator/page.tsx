// app/tools/cv-generator/page.tsx
'use client';
import React, { useState } from 'react';
import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import { CvData } from '@/types/cvData';
import '@/styles/cvGenerator.css';
import AnimatedButton from '@/components/AnimatedButton';
import { useRouter } from 'next/navigation';

const defaultData: CvData = {
	personal: {
		fullName: '',
		title: '',
		email: '',
		phone: '',
		location: '',
		github: '',
		linkedin: '',
	},
	summary: '',
	experience: [
		{
			role: '',
			company: '',
			location: '',
			from: '',
			to: '',
			description: '',
		},
	],
	education: [
		{
			degree: '',
			school: '',
			location: '',
			from: '',
			to: '',
		},
	],
	skills: [],
	languages: [
		{
			language: '',
			level: '',
		},
	],
};

export default function CVGeneratorPage() {
	const [cvData, setCvData] = useState<CvData>(defaultData);
	const router = useRouter();

	return (
		<div className="cv-generator-container">
			<AnimatedButton
				text="← Back to Home"
				variant="primary"
				onClick={() => router.push('/tools')}
			/>
			<h1 className="cv-generator-title">CV Generator</h1>

			<div className="cv-generator-content">
				<CVForm
					data={cvData}
					onChange={setCvData}
				/>
				<CVPreview data={cvData} />
			</div>
		</div>
	);
}
