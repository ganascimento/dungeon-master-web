/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const getHeader = (): any => {
  // const token = getToken();

  // if (token) {
  // 	return {
  // 		Authorization: `Bearer ${token}`,
  // 	};
  // }

  return {};
};

const Api = axios.create({
  baseURL: "http://localhost:5000",
  headers: getHeader(),
});

// Api.interceptors.response.use(
// 	response => response,
// 	error => {
// 		const status = error.response ? error.response.status : null;

// 		if (status === 401) {
// 			error.config.headers['Authorization'] = `Bearer ${getToken()}`;
// 			return axios.request(error.config);
// 		}

// 		return Promise.reject(error);
// 	},
// );

export { Api };
