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
