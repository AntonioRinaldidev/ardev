import { CvData } from '@/types/cvData';
import { ApiService } from './ApiService';

export const downloadCV = async (): Promise<void> => {
	const url =
		process.env.NEXT_PUBLIC_API_DOWNLOAD_CV_ENDPOINT ||
		'/api/download/downloadCV';

	try {
		const response = await ApiService.get(url, {
			responseType: 'blob', // 📌 Necessario per file download
		});

		const blob = response.data;

		// ✅ Verifica che sia un Blob valido
		if (!(blob instanceof Blob)) {
			throw new Error('La risposta non è un file valido');
		}

		// ✅ Crea URL di download
		const downloadUrl = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = downloadUrl;
		a.download = 'AntonioRinaldiCV.pdf';
		document.body.appendChild(a);
		a.click();
		a.remove();

		// ✅ Pulisci
		window.URL.revokeObjectURL(downloadUrl);
	} catch (error) {
		console.error('❌ Errore durante il download del CV:', error);
		throw error;
	}
};

export const generateCV = async (cvData: CvData): Promise<void> => {
	const url = process.env.NEXT_PUBLIC_API_GENERATE_CV_ENDPOINT || '/api/cv/pdf';

	try {
		const response = await ApiService.post(url, cvData, {
			responseType: 'blob',
		});

		const blob = response.data;

		if (!(blob instanceof Blob)) {
			throw new Error('La risposta non è un file valido');
		}

		const downloadUrl = window.URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = downloadUrl;
		a.download = `${cvData.personal.fullName || 'CV'}.pdf`;
		document.body.appendChild(a);
		a.click();
		a.remove();

		window.URL.revokeObjectURL(downloadUrl);
	} catch (error) {
		console.error('❌ Errore durante la generazione del CV:', error);
		throw error;
	}
};
