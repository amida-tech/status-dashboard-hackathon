'use strict';
const controller = require('../controller')

module.exports.index = async (event, context) => {
    

    

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Hello World"
      }),
    };
};
