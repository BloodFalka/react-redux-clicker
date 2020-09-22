import axios from 'axios'

export type APIResponseType<D = {}, M = string> = {
	errors: Array<string>,
	message: M,
	data: D,
}

//AXIOS INSTANCE//
export const axiosInstance = axios.create({
	baseURL: 'http://localhost:5000/api/',
	validateStatus: function (status) {
		return status >= 200 && status < 500 // default
	},
})
