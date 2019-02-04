exports.sendResponse = (response, data, statusCode, headers) => {
    if (typeof data === 'function') {
        // We shouldn't be sending back functions
        response.writeHead(500, headers);
        response.end('Error');
    }
    // Convert non-strings to strings (.end requires a string or string buffer) 
    if (typeof data !== 'string') {
        data = JSON.stringify(data);
    }
    response.writeHead(statusCode, headers);
    response.end(data);
};

// Replaces body-parser
exports.collectData = (request, callback) => {
    var data = '';
    request.on('data', (chunk) => {
        data += chunk;
    });
    request.on('end', () => {
        callback(data);
    });
};

exports.insert = (str, index, value) => {
    return str.substr(0, index) + value + str.substr(index);
}

exports.mimetypes = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.wav': 'audio/wav',
    '.mp3': 'audio/mpeg',
    '.svg': 'image/svg+xml',
    '.pdf': 'application/pdf',
    '.doc': 'application/msword',
    '.eot': 'appliaction/vnd.ms-fontobject',
    '.ttf': 'aplication/font-sfnt'
};
