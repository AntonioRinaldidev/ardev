'use client';

let ls: any = null;

if (typeof window !== 'undefined') {
	ls = require('secure-ls');
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
		ls.remove(key);
	},

	clearAll: () => {
		if (!ls) return;
		ls.removeAll();
	},
};
