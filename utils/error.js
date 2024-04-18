
export default function errorHandler(message,statusCode) {
    const err = new Error();
    const message = err.message || "InValid Data";
    const statusCode = err.statusCode || 500;
    return err
}
