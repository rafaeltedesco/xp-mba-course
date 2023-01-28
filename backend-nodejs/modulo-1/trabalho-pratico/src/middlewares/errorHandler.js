const handleError = (err, _req, res, _next) => {
    const { status, message} = err;
    return res.status(status || 500).json({ message })
}

const asyncErrorHandler = (fn) => {
    return async (req, res, next) => {
        try {
            await fn(req, res)
        }
        catch(err) {
            console.log('error aqui', err)
            return next(err)
        }
    }
}


module.exports = {
    handleError,
    asyncErrorHandler,
}