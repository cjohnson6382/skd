/*

*/

// import {API_SERVER_PREFIX, AUDIENCE, CLIENT_ID, CLIENT_SECRET} from './config';
import { API_SERVER_PREFIX } from './config';

// export let resource_schema_ids = {}
export let app_ids = {}

const headers = {
	"Authorization": "Bearer " + localStorage.getItem("id_token"),
	"accept": "application/json",
	"content-type": "application/json"		
}

function* idx () { for (let i = 1; i < 5; i++) yield  (2**i++)*1000 }

let gen = idx()

export const curry = (f, p) => p.reduce((g, h) => g(h), f)
export const compose = (...fs) => fs.reduce((f, g) => (...args) => f(g(...args)))

const retry = async (f, p) => {
	try {
		let result = await curry(f, p)
		let delay = gen.next().value
		// window.dispatchEvent(customNotification(`retrying in ${delay} milliseconds`))
		let r = result.status === 200 ? result : await setTimeout(retry, delay) 
		return r
	} catch (e) { setTimeout(retry, gen.next().value) }
}

export const fetchErrorWrapper = async (f, ...p) => {
	try {
		let result = await curry(f, p)
		return result
	} catch (err) {
		// window.dispatchEvent(customNotification(`something went wrong sending a ${p.method} request to ${p.route} (see console for more details)`))		
		console.log("this is the error that the browser encountered while communicating with the server: ", err)

		// let result, gen = idx()
		return await retry(f, p)
	}
}

export const kaizenFetch = method => url => options => fetchErrorWrapper(uncheckedKaizenFetch, method, url, options)
const uncheckedKaizenFetch = method => url => options => fetch(API_SERVER_PREFIX + url, { headers: headers, method: method, mode: "cors", body: JSON.stringify(options) })

