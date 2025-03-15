import axios, { AxiosRequestConfig } from 'axios';
import SecureLS from 'secure-ls';

// Replace with your backend URL

// ✅ Initialize SecureLS with AES encryption
const ls = new SecureLS({ encodingType: 'aes', isCompression: false });

// ✅ Helper functions to store and retrieve tokens securely
const setTokens = (accessToken: string, refreshToken: string) => {
	try {
		ls.set('accessToken', JSON.stringify(accessToken)); // ✅ Ensure token is stored as a string
		ls.set('refreshToken', JSON.stringify(refreshToken));
	} catch (error) {
		console.error('🚨 SecureLS Error: Failed to store token', error);
	}
};

const getAccessToken = () => {
	try {
		const token = ls.get('accessToken');
		if (typeof token === 'string') {
			return token;
		} else {
			console.warn('❌ Corrupt accessToken detected, clearing storage...');
			ls.remove('accessToken'); // ✅ Clear corrupted token
			return null;
		}
	} catch (error) {
		console.error('🚨 SecureLS Error: Malformed Token - Clearing Storage...');
		ls.remove('accessToken');
		return null;
	}
};

const getRefreshToken = () => ls.get('refreshToken') || null;
const clearTokens = () => {
	ls.remove('accessToken');
	ls.remove('refreshToken');
};

// ✅ Axios instance with credentials support for HTTP-only cookies
export const ApiService = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	withCredentials: true, // Ensures cookies (refresh token) are sent automatically
});

// ✅ Function to add Authorization header if available
const addAuthHeader = async (config: { headers?: any }) => {
	const accessToken = getAccessToken();
	if (accessToken) {
		config.headers = {
			...config.headers,
			Authorization: `Bearer ${accessToken}`,
		};
	}
	return config;
};

// ✅ Set default Content-Type to application/json
const configureJsonRequest = async (config = {}) => {
	const authHeaderConfig = await addAuthHeader(config);
	authHeaderConfig.headers = {
		...authHeaderConfig.headers,
		'Content-Type': 'application/json',
	};
	return authHeaderConfig;
};

// ✅ Request interceptor for logging API calls
ApiService.interceptors.request.use(
	(config) => {
		console.log('🚀 Interceptor is executing...');
		console.log('✅ BASE_URL:', process.env.NEXT_PUBLIC_API_BASE_URL);
		console.log(
			`API called: ${process.env.NEXT_PUBLIC_API_BASE_URL}${config.url}`,
		);
		return config;
	},
	(error) => {
		console.error('Error in request interceptor:', error);
		return Promise.reject(error);
	},
);

// ✅ GET request
const getRequest = async (url: string, params = {}, config = {}) => {
	const requestConfig: AxiosRequestConfig = await configureJsonRequest(config);
	requestConfig.params = params;
	return ApiService.get(url, requestConfig);
};

// ✅ DELETE request
const deleteRequest = async (url: string, data = {}, config = {}) => {
	const requestConfig = await configureJsonRequest(config);
	return ApiService.delete(url, { ...requestConfig, data });
};

// ✅ PUT request
const putRequest = async (url: string, data = {}, config = {}) => {
	const requestConfig = await configureJsonRequest(config);
	return ApiService.put(url, data, requestConfig);
};

// ✅ POST request with application/json
const postRequest = async (url: string, data = {}, config = {}) => {
	console.log(url);
	const requestConfig = await configureJsonRequest(config);
	return ApiService.post(url, data, requestConfig);
};

// ✅ POST request with multipart/form-data
const postFormRequest = async (url: string, data: FormData, config = {}) => {
	const authHeaderConfig = await addAuthHeader(config);

	authHeaderConfig.headers = {
		...authHeaderConfig.headers,
		'Content-Type': 'multipart/form-data',
	};
	return ApiService.post(url, data, authHeaderConfig);
};

// ✅ Refresh token handler (securely retrieves refresh token)
const refreshTokenHandler = async () => {
	const refreshToken = getRefreshToken(); // Securely fetch refresh token

	if (!refreshToken) {
		console.error('No refresh token found, logging out...');
		await logout();
		return;
	}

	const config = await configureJsonRequest();

	try {
		const refreshResponse = await ApiService.post(
			process.env.API_BASE_URL + 'api/refresh',
			{},
			config,
		);

		// ✅ Store new tokens securely
		setTokens(
			refreshResponse.data.accessToken,
			refreshResponse.data.refreshToken,
		);
	} catch (error) {
		console.error('Error during token refresh:', error);
		await logout();
	}
};

// ✅ Logout function
const logout = async () => {
	try {
		await ApiService.post(process.env.API_BASE_URL + 'api/logout'); // Clear refresh token in backend
		clearTokens(); // Remove tokens from SecureLS
		console.log('Logged out successfully');
	} catch (error) {
		console.error('Error during logout:', error);
	}
};

// ✅ Response interceptor to handle token expiration & refresh
ApiService.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			try {
				const originalRequest = error.config;

				// ✅ Refresh the token (refresh token is automatically sent in the cookie)
				await refreshTokenHandler();

				// Remove old Authorization header
				delete originalRequest.headers['Authorization'];

				// ✅ Add new access token and retry request
				const newRequest = await addAuthHeader(originalRequest);
				return axios(newRequest);
			} catch (innerError) {
				console.error('Error during token refresh:', innerError);
				await logout();
				return Promise.reject(innerError);
			}
		}
		return Promise.reject(error);
	},
);

// ✅ Export API methods
export {
	postRequest,
	postFormRequest,
	getRequest,
	deleteRequest,
	putRequest,
	refreshTokenHandler,
	logout,
};
