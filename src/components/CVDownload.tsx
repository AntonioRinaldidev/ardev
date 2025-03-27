'use client';
import React from 'react';
import { CvData } from '@/types/cvData';
import { generateCV } from '@/services/fileService'; // 🔧 funzione helper
import '@/styles/cvPreview.css';

export default function CVPdfDownload({ data }: { data: CvData }) {
	const handleDownload = async () => {
		try {
			await generateCV(data);
		} catch (err) {
			console.error('Errore durante il download del CV:', err);
			alert('❌ Errore durante il download del PDF.');
		}
	};

	return (
		<button
			className="btn-export"
			onClick={handleDownload}>
			📄 Scarica PDF
		</button>
	);
}
