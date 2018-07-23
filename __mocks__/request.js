const fs = require('fs'),
    path = require('path');

const request = (url, callback) => {
    process.nextTick(() => {
        fs.readFile(
            path.join(__dirname + '/../test/mockData/exampleResponse.json'),
            'utf8',
            (err, data) => {
                if (err) {
                    callback(err);
                }

                const response = {
                    statusCode: 200,
                    statusMessage: 'Dummy message'
                };

                callback(null, response, data);
            }
        );
    });
};

module.exports = request;
