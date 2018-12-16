const asyncHandler = require('express-async-handler')
const raspberry = require('../src/raspberry')
const path = require('path')
const appDir = path.dirname(require.main.filename)
const config = require('../config.json')
const cloudinary = require('cloudinary')
const debug = require('debug')('picture')
const Loki = require('lokijs')

const db = new Loki('db.json',
    {
        autoload: true,
        autoloadCallback: databaseInitialize,
        autosave: true,
        autosaveInterval: 4000
    })

function databaseInitialize () {
    var photos = db.getCollection('photos')

    if (photos === null) {
        db.addCollection('photos')
    }
}

cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryClientSecret
})

const takePicture = asyncHandler(async (req, res, next) => {
    var photos = db.getCollection('photos')
    const captureId = req.body.captureId

    if (!captureId) {
        res.status(400).send('CaptureID required!')
    }

    const filePath = path.join(appDir, `pictures/pb-${captureId}.jpg`)

    try {
        raspberry.takePicture(captureId)
            .then(function (result) {
                debug('result', result)

                cloudinary.uploader.upload(filePath, function (result) {
                    photos.insert({ id: captureId, width: result.width, height: result.height, url: result.url, created: result.created_at })
                    debug(result)
                }, { public_id: captureId })
            })
        res.send(req.body)
    } catch (error) {
    // Errors will be passed to Express.
        debug(error)
        next(error)
    }
})

const getPicture = asyncHandler(async (req, res, next) => {
    if (!req.params.captureId) {
        res.status(400).send('CaptureID required')
    }
    var photos = db.getCollection('photos')
    const captureId = req.params.captureId

    var result = photos.find({ id: captureId })

    try {
        res.send(result[0] || {})
    } catch (error) {
        next(error)
    }
})

const getPictures = (req, res) => {
    var photos = db.getCollection('photos')

    res.send(photos.data)
}

module.exports = {
    getPicture,
    getPictures,
    takePicture
}
