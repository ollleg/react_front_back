
export const callApi = async (method, path, { body, namespace, onSuccess, onError }) => {
  try {
    let request = {
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }
    if (body) request.body = JSON.stringify(body)

    const response = await fetch(path, request);
    const json = await response.json()
    const { status, error_code } = json

    if (status == 'ok') {
      onSuccess && onSuccess(json)
      return json
    } else {
      console.log(json)
      onError && onError({ error_code })
      return { error_code }
    }
  } catch (err) {
    console.log(err)
    onError && onError({ error_code })
    return { error_code }
  }
}