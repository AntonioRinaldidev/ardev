// src/services/storageService.ts

let secureLSInstance: any = null;

const isBrowser = typeof window !== 'undefined';

if (isBrowser) {
	const SecureLS = require('secure-ls');
	secureLSInstance = new SecureLS({
		encodingType: 'aes',
		isCompression: false,
	});
}

export const storageService = {
	set: (key: string, value: any) => {
		if (!isBrowser || !secureLSInstance) return;
		try {
			secureLSInstance.set(key, JSON.stringify(value));
		} catch (error) {
			console.error('storageService.set error:', error);
		}
	},

	get: (key: string): any => {
		if (!isBrowser || !secureLSInstance) return null;
		try {
			const data = secureLSInstance.get(key);
			return typeof data === 'string' ? JSON.parse(data) : data;
		} catch (error) {
			console.error('storageService.get error:', error);
			return null;
		}
	},

	remove: (key: string) => {
		if (!isBrowser || !secureLSInstance) return;
		try {
			secureLSInstance.remove(key);
		} catch (error) {
			console.error('storageService.remove error:', error);
		}
	},

	clearAll: () => {
		if (!isBrowser || !secureLSInstance) return;
		try {
			secureLSInstance.removeAll();
		} catch (error) {
			console.error('storageService.clearAll error:', error);
		}
	},
};

export default storageService;
