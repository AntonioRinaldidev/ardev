// src/services/jarvisService.tsx - AGGIORNATO per il nuovo backend
import { getRequest, postRequest } from './ApiService';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// 🔄 Tipi per il nuovo backend
export interface JarvisMessage {
	message: string;
	session_id?: string; // Backend usa snake_case
}

export interface JarvisResponse {
	jarvis: string; // Backend ritorna "jarvis" non "response"
	session_id: string;
	status: string;
	timestamp: string;
	context_used?: number;
	rag_enabled?: boolean;
}

export interface JarvisStatus {
	status: string;
	version?: string;
	jarvis?: string;
	memoryStats?: any;
	timestamp?: string;
}

export interface UploadDocument {
	title: string;
	content: string;
}

// ✅ Status check - endpoint aggiornato
export const getJarvisStatus = async (): Promise<JarvisStatus> => {
	try {
		const response = await getRequest(
			process.env.NEXT_PUBLIC_API_GET_JARVIS_STATUS_ENDPOINT || ''
		);
		return {
			status: response.data.status,
			version: response.data.version,
			jarvis: response.data.jarvis,
			memoryStats: response.data.memory_stats,
			timestamp: response.data.timestamp,
		};
	} catch (error) {
		console.error('❌ Errore status JARVIS:', error);
		return { status: 'offline' };
	}
};

// 🤖 Chat con JARVIS - endpoint aggiornato
export const sendMessageToJarvis = async (
	message: string,
	sessionId?: string
): Promise<JarvisResponse | null> => {
	try {
		const payload: JarvisMessage = { message };
		if (sessionId) payload.session_id = sessionId; // Backend usa snake_case

		const response = await postRequest(
			process.env.NEXT_PUBLIC_API_POST_JARVIS_MESSAGE_ENDPOINT || '',
			payload
		);

		return {
			jarvis: response.data.jarvis, // Backend ritorna "jarvis"
			session_id: response.data.session_id,
			status: response.data.status,
			timestamp: response.data.timestamp,
			context_used: response.data.context_used,
			rag_enabled: response.data.rag_enabled,
		};
	} catch (error) {
		console.error('❌ Errore invio messaggio:', error);
		return null;
	}
};

// 📁 Upload documento alla knowledge base
export const uploadDocumentToJarvis = async (
	title: string,
	content: string
): Promise<boolean> => {
	try {
		const response = await postRequest(
			`${BASE_URL}api/jarvis/upload-document`,
			{
				title,
				content,
			}
		);

		return response.data.success || false;
	} catch (error) {
		console.error('❌ Errore upload documento:', error);
		return false;
	}
};

// 🧪 Test Vectorize (per debug)
export const testVectorizeConnection = async (): Promise<any> => {
	try {
		const response = await postRequest(
			`${BASE_URL}api/jarvis/test-vectorize`,
			{}
		);
		return response.data;
	} catch (error) {
		console.error('❌ Errore test vectorize:', error);
		return null;
	}
};

// 💾 Gestione sessioni locali (localStorage)
export const getStoredSessionId = (): string | null => {
	if (typeof window !== 'undefined') {
		return localStorage.getItem('jarvis_session_id');
	}
	return null;
};

export const storeSessionId = (sessionId: string): void => {
	if (typeof window !== 'undefined') {
		localStorage.setItem('jarvis_session_id', sessionId);
	}
};

export const clearStoredSession = (): void => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem('jarvis_session_id');
	}
};
