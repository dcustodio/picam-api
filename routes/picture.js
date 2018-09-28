const asyncHandler = require('express-async-handler')
const raspberry = require('../src/raspberry')

export const takePicture = asyncHandler(async (req, res, next) => {
    const captureId = req.body.captureId

    if (!captureId) {
        res.status(400).send('CaptureID required!')
    }

    await raspberry.takePicture().then(function (result) {
        console.log(req.params.captureId)
        res.send(result)
    }).catch(next) // Errors will be passed to Express.
})

export const getPicture = asyncHandler(async (req, res, next) => {
    // if (!req.params.captureId) {
    //     res.status(400).send('Something broke!')
    // }

    // await raspberry.takePicture().then(function (result) {
    //     console.log(req.params.captureId)
    //     res.send(result)
    // }).catch(next) // Errors will be passed to Express.
})
