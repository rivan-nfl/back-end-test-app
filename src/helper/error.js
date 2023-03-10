export default function error(statusCode = 500, message = 'Something went wrong') {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error
};