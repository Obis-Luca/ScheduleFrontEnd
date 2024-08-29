/*
The issue you're encountering is common when using localhost in an Android Virtual Device (AVD).
 The problem is that localhost in the AVD refers to the emulator itself, not your computer's localhost where your backend is running.
To fix this, you need to use a special IP address that the Android emulator provides to access the host machine. 
*/
// const BASE_URL = "http://10.0.2.2:8080";
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
