const asyncHandler = require('express-async-handler')
 
const raspberry = require('../src/raspberry')

module.exports = asyncHandler(async(req, res,next) => {

    await raspberry.takePicture().then(function (result) {
console.log(result)
	res.send(result)
      }).catch(next); // Errors will be passed to Express.
   
}) 