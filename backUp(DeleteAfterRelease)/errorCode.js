var errorCodes = [];
errorCodes[0] = 401;
errorCodes[1] = 400;
errorCodes[2] = 404;
errorCodes[3] = 500;
errorCodes[4] = 501;

const getErrorCodes = () => {
    return errorCodes;
}

exports.getErrorCodes = getErrorCodes;