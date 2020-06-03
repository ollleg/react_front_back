export const endpoint = (method, path, app, func) => {
    if(method == 'DELETE') return app.delete(path, (req, res) => handleEndpoint(func, req, res))
    if(method == 'GET') return app.get(path, (req, res) => handleEndpoint(func, req, res))
    if(method == 'PUT') return app.put(path, (req, res) => handleEndpoint(func, req, res))
    throw('Unhandled endpoint method')
}

export const handledError = (status_code,error_code) => {
    return {
        type: 'handled_error',
        status_code,
        error_code
    }
}

const okResponse = (res, data) => {
    let response = {status: 'ok'}
    if(data) response.data = data
    res.status(200).send(response)
}

const handleEndpoint = (func, req, res) => {
    res.set('Content-Type', 'application/json')
    try {
        const funcRes = func({req, res}) 
        if(funcRes && typeof funcRes.then === 'function') {
            funcRes.then((data) => {
                okResponse(res, data)
            })
            .catch((e) => handleErrors(e, {res, req}) )
        } else {
            okResponse(res, funcRes)
        }
    } catch(e) {
        handleErrors(e, {res, req})
    }
}

const handleErrors = (e, {res, req}) => {
    if(e && e.type == 'handled_error') {
        const {status_code, error_code} = e
        res.status(status_code).send({status: 'error', error_code })
    } else {
        console.log('Unhandled error', e)
        let error_code = 'internal_error'
        if(e && e.code == 'ECONNREFUSED') {
            error_code = 'db_connection_error'
        }
        res.status(500).send({status: 'error', error_code})
    }
}