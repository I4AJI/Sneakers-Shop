module.exports = (err, req, res, next) => {
    console.error(err.stack);

    const status = err.status || 500;
    const response = {
        error: err.message || 'Internal Server Error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    };

    res.status(status).json(response);
};