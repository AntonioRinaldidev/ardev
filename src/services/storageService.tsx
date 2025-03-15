'use client';

import SecureLS from 'secure-ls';

let ls: SecureLS | null = null;

if (typeof window !== 'undefined') {
	ls = new SecureLS({ encodingType: 'aes' }); // puoi cambiare encodingType se vuoi
}

export const storageService = {
	set: (key: string, value: any) => {
		if (!ls) return;
		try {
			ls.set(key, JSON.stringify(value));
		} catch (e) {
			console.error('storageService.set error:', e);
		}
	},

	get: (key: string): any => {
		if (!ls) return null;
		try {
			const data = ls.get(key);
			return typeof data === 'string' ? JSON.parse(data) : data;
		} catch (e) {
			console.error('storageService.get error:', e);
			return null;
		}
	},

	remove: (key: string) => {
		if (!ls) return;
		try {
			ls.remove(key);
		} catch (e) {
			console.error('storageService.remove error:', e);
		}
	},

	clearAll: () => {
		if (!ls) return;
		try {
			ls.removeAll();
		} catch (e) {
			console.error('storageService.clearAll error:', e);
		}
	},
};
