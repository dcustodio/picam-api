const asyncHandler = require('express-async-handler')
const raspberry = require('../src/raspberry')
const fs = require('fs')
const path = require('path')
const appDir = path.dirname(require.main.filename)
const config = require('../config.json')
const cloudinary = require('cloudinary')

const takePicture = asyncHandler(async (req, res, next) => {
    const captureId = req.body.captureId

    if (!captureId) {
        res.status(400).send('CaptureID required!')
    }

    const filePath = path.join(appDir, `pictures/pb-${captureId}.jpg`)

    try {
        await raspberry.takePicture(captureId).then(function (result) {
            console.log(req.params.captureId)
            res.send(result)
        })

        cloudinary.config({
            cloud_name: config.cloudinaryCloudName,
            api_key: config.cloudinaryApiKey,
            api_secret: config.cloudinaryClientSecret
        })

        cloudinary.uploader.upload(filePath, function (result) { console.log(result) }, { public_id: captureId })
    } catch (error) {
        // Errors will be passed to Express.

        next(error)
    }
})

const getPicture = asyncHandler(async (req, res, next) => {
    if (!req.params.captureId) {
        res.status(400).send('CaptureID required')
    }
    const captureId = req.params.captureId

    // fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    //     if (!err) {
    //         console.log('received data: ' + data);

    //         response.writeHead(200, {'Content-Type': 'text/html'});
    //         response.write(data);
    //         response.end();
    //     } else {
    //         console.log(err);
    //     }
    // });
    try {
        const filePath = path.join(appDir, `pictures/${captureId}.jpg`)
        var contents = fs.readFileSync(filePath, 'utf8')

        res.send(contents)
    } catch (error) {
        next(error)
    }
})

module.exports = {
    getPicture,
    takePicture
}
