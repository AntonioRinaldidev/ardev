import { getRequest, postRequest } from './ApiService';
const URL = 'https://antoniorinaldidev.com/';
export const getJarvisStatus = async () => {
	const STATUSURL = URL + 'api/jarvis';

	const response = await getRequest(STATUSURL);
	if (response.data.status === 'online') {
		return {
			jarvisVersion: response.data.version,
			status: response.data.status,
		};
	} else {
		return { status: 'offline' };
	}
};

export const postMessageJarvis = async (message: string) => {
	const MESSAGEURL = URL + 'api/jarvis';
	const response = await postRequest(MESSAGEURL, { message: message });
	if (response.data.jarivs !== '') {
		return { jarvisResponse: response.data.jarvis };
	}
};
