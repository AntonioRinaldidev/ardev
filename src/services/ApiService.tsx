import axios, { AxiosRequestConfig } from 'axios';

// ✅ Axios instance with credentials support for HTTP-only cookies
const ApiService = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL_LOCAL,
	withCredentials: true,
});

// ✅ Configure JSON request headers
const configureJsonRequest = async (config = {}) => {
	return {
		...config,
		headers: {
			...(config as any).headers,
			'Content-Type': 'application/json',
		},
	};
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
	}
);

// ✅ Response interceptor (basic)
ApiService.interceptors.response.use(
	(response) => response,
	(error) => {
		console.error('❌ API Response error:', error);
		return Promise.reject(error);
	}
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
	const requestConfig = {
		...config,
		headers: {
			...(config as any).headers,
			'Content-Type': 'multipart/form-data',
		},
	};
	return ApiService.post(url, data, requestConfig);
};

// ✅ Export all
export {
	ApiService,
	getRequest,
	postRequest,
	putRequest,
	deleteRequest,
	postFormRequest,
};
