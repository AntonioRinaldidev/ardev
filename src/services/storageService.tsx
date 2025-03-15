// src/services/storageService.ts
let ls: any = null;

if (typeof window !== 'undefined') {
	const SecureLS = require('secure-ls');
	ls = new SecureLS({ encodingType: 'aes', isCompression: false });
}

export const storageService = {
	set: (key: string, value: any) => {
		if (!ls) return;
		try {
			ls.set(key, JSON.stringify(value));
		} catch (e) {
			console.error('SecureLS set error:', e);
		}
	},

	get: (key: string): any => {
		if (!ls) return null;
		try {
			const data = ls.get(key);
			return typeof data === 'string' ? JSON.parse(data) : data;
		} catch (e) {
			console.error('SecureLS get error:', e);
			return null;
		}
	},

	remove: (key: string) => {
		if (!ls) return;
		ls.remove(key);
	},

	clearAll: () => {
		if (!ls) return;
		ls.removeAll();
	},
};
