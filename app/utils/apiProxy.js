// utils/apiProxy.js

const BASE_URL = "http://localhost:8080";

export const apiProxy = {
	get: async (endpoint) => {
		const response = await fetch(`${BASE_URL}${endpoint}`);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		return await response.json();
	},
};
