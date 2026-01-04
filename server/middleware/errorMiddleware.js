
// This is a "catch-all" that runs only if no route matched above it.
const notFound = (req, res, next) => {
    const error = new Error(`Notfound - ${req.originalUrl}`);
    res.status(404); // 404 = notfound
    next(error);
}

// This is a special middleware with four arguments (err, req, res, next) that catches any errors thrown in the routes.
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // mongoose invalid objectId
    if(err.name == "CastError" && err.kind == "ObjectId") {
        message = "Resource not found";
    }
    
    res.status(statusCode).json({
        message: message,
        stack: process.env.NODE_ENV == "production" ? null: err.stack,
    });
};

export {notFound, errorHandler};