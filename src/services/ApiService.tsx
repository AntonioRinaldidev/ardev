import axios, { AxiosRequestConfig } from 'axios';
import { storageService } from './storageService';

// ✅ Axios instance with credentials support for HTTP-only cookies
const ApiService = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	withCredentials: true,
});

// ✅ Helper token handlers

const setTokens = (accessToken: string, refreshToken: string) => {
	storageService.set('accessToken', accessToken);
	storageService.set('refreshToken', refreshToken);
};

const getAccessToken = () => storageService.get('accessToken');
const getRefreshToken = () => storageService.get('refreshToken');
const clearTokens = () => {
	storageService.remove('accessToken');
	storageService.remove('refreshToken');
};

// ✅ Add Authorization header
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

// ✅ Configure JSON request headers
const configureJsonRequest = async (config = {}) => {
	const authHeaderConfig = await addAuthHeader(config);
	authHeaderConfig.headers = {
		...authHeaderConfig.headers,
		'Content-Type': 'application/json',
	};
	return authHeaderConfig;
};

// ✅ Request logging
ApiService.interceptors.request.use(
	(config) => {
		console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
		return config;
	},
	(error) => {
		console.error('Request interceptor error:', error);
		return Promise.reject(error);
	},
);

// ✅ Response interceptor with token refresh
ApiService.interceptors.response.use(
	(response) => response,
	async (error) => {
		if (error.response?.status === 401) {
			try {
				const originalRequest = error.config;
				await refreshTokenHandler();
				delete originalRequest.headers['Authorization'];
				const newRequest = await addAuthHeader(originalRequest);
				return axios(newRequest);
			} catch (refreshError) {
				await logout();
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	},
);

// ✅ API methods
const getRequest = async (url: string, params = {}, config = {}) => {
	const requestConfig: AxiosRequestConfig = await configureJsonRequest(config);
	requestConfig.params = params;
	return ApiService.get(url, requestConfig);
};

const postRequest = async (url: string, data = {}, config = {}) => {
	const requestConfig = await configureJsonRequest(config);
	return ApiService.post(url, data, requestConfig);
};

const putRequest = async (url: string, data = {}, config = {}) => {
	const requestConfig = await configureJsonRequest(config);
	return ApiService.put(url, data, requestConfig);
};

const deleteRequest = async (url: string, data = {}, config = {}) => {
	const requestConfig = await configureJsonRequest(config);
	return ApiService.delete(url, { ...requestConfig, data });
};

const postFormRequest = async (url: string, data: FormData, config = {}) => {
	const authHeaderConfig = await addAuthHeader(config);
	authHeaderConfig.headers = {
		...authHeaderConfig.headers,
		'Content-Type': 'multipart/form-data',
	};
	return ApiService.post(url, data, authHeaderConfig);
};

// ✅ Refresh Token Handler
const refreshTokenHandler = async () => {
	const refreshToken = getRefreshToken();
	if (!refreshToken) {
		await logout();
		return;
	}

	const config = await configureJsonRequest();
	try {
		const response = await ApiService.post(
			`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/refresh`,
			{},
			config,
		);
		setTokens(response.data.accessToken, response.data.refreshToken);
	} catch (error) {
		console.error('Token refresh failed:', error);
		await logout();
	}
};

// ✅ Logout
const logout = async () => {
	try {
		await ApiService.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/logout`);
		clearTokens();
		console.log('Logged out successfully');
	} catch (error) {
		console.error('Logout error:', error);
	}
};

// ✅ Export all
export {
	ApiService,
	getRequest,
	postRequest,
	putRequest,
	deleteRequest,
	postFormRequest,
	refreshTokenHandler,
	logout,
};
