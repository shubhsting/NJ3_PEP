function handleException(exception, identifier, response) {
    return response.status(500).send({
        message: `Some exception occured in ${identifier}`,
        exception: exception
    })
}

module.exports = { handleException }