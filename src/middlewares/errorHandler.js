const handleError = (err, req, res, _next) => {
    const { status, message} = err;
    return res.status(status || 500).json({ message })
}


module.exports = {
    handleError
}