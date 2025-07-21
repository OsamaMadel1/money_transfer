export default function errorHandler(error, request, response, next) {
    // MongoDB duplicate key error
    if (error.code === 11000) {
        const fields = Object.entries(error.keyValue)
            .map(([key, value]) => `'${key}' with value '${value}'`)
            .join(', ');

        const message = `Duplicated value in field(s): ${fields}`;

        return response.status(409).json({
            success: false,
            message,
        });
    }

    // Any other error
    return response.status(500).json({
        success: false,
        message: error.message || 'Internal server error',
        // فقط أثناء التطوير:
        // stack: error.stack 
    });
}