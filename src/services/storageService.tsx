'use client';

let ls: any = null;

if (typeof window !== 'undefined') {
	const SecureLS = require('secure-ls');
	ls = new SecureLS({ encodingType: 'aes' });
}

export const storageService = {
	set: (key: string, value: any) => {
		if (!ls) return;
		try {
			const serialized = JSON.stringify(value);
			ls.set(key, serialized);
		} catch (e) {
			console.error('storageService.set error:', e);
		}
	},

	get: (key: string): any => {
		if (!ls) return null;
		try {
			const raw = ls.get(key);
			if (typeof raw === 'string') {
				return raw.trim() ? JSON.parse(raw) : null;
			}
			return raw;
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
