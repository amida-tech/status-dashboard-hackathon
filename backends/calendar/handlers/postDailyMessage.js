const controller = require('../controller')
const message = "Hi! this is the work from home bot. You can place yourself on the work from home calendar, or let your teamates know that you'll be in the office today by selecting either the house :house: or office :office: emoji"


module.exports.index = async (event, context) => {
  const response = {
    statusCode: 200
  }
  try {
    let res = await controller.postDailyMessage(message);
    if(res.ok) {
      await controller.putInMessagesTable(res);
      response.timeStamp = res.ts;
      response.channel = res.channel;
      response.message = message;
    } else {
      response.statusCode = 500;
      response.message = "Internal server error";
      response.error = res.error;
    }
    
  } catch(err){
    response.statusCode = 500;
    response.message = "Internal server error";
    response.error = err;
  }

  return response;
}