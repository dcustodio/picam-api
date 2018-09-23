const raspberry = require('../src/raspberry')

module.exports = (req, res,next) => {

    raspberry.takePicture().then(function () {
        throw new Error("BROKEN");
      }).catch(next); // Errors will be passed to Express.
   
} 