function getResponse(response) {
	if (response.status >= 200 && response.status < 300) {
		return Promise.resolve(response)
	} else {
		return Promise.reject(new Error(response))
	}
}

function convertToJson(response) {
	return response.json()
}

function post(url, headers, body) {
	return (
		fetch(url, {
			method: "POST",
			headers: headers,
			body: JSON.stringify(body)})
			.then(getResponse)
			.then(convertToJson)
	)
}

const get = () => {}



module.exports = { get, post }
