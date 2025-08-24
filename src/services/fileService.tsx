
import { ApiService } from './ApiService';

export const downloadCV = async (): Promise<void> => {
	try {
		const response = await ApiService.get(
			process.env.NEXT_PUBLIC_API_DOWNLOAD_CV_ENDPOINT || '',
			{
				responseType: 'blob', // 📌 Necessario per file download
			}
		);

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
