import { postRequest } from './ApiService';
import { BaseResponseDTO, loginDTO } from '@krysondto/shared-dtos';

export const loginAsync = async (data: loginDTO): Promise<BaseResponseDTO> => {
	return (
		await postRequest(
			process.env.API_ACCOUNT_POST_LOGIN_ENDPOINT || '',
			JSON.stringify(data),
		)
	).data;
};

export const sendContactFormAsync = async (data: {
	name: string;
	email: string;
	subject: string;
	message: string;
}): Promise<BaseResponseDTO> => {
	return (
		await postRequest(
			process.env.NEXT_PUBLIC_API_SEND_EMAIL_ENDPOINT || '',
			JSON.stringify(data),
		)
	).data;
};
