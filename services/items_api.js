const post = (url, headers, body) => {
  return (
    fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)})
    .then((response) => response.json())
    .then((responseData) => responseData)
    .catch((err) => reject(err))
  )
}

const get = (url, body) => {}



module.exports = { get, post }
