const asyncHandler = require('express-async-handler')
const raspberry = require('../src/raspberry')
const fs = require('fs')
const path = require('path')
const appDir = path.dirname(require.main.filename)
const config = require('../config.json')
const cloudinary = require('cloudinary')
const debug = require('debug')('picture')
const Loki = require('lokijs')

const db = new Loki('db.json')
const photos = db.addCollection('photos')

cloudinary.config({
    cloud_name: config.cloudinaryCloudName,
    api_key: config.cloudinaryApiKey,
    api_secret: config.cloudinaryClientSecret
})

const takePicture = asyncHandler(async (req, res, next) => {
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
        // res.json(result)
        res.send(req.body)

        /*
        {
public_id: 'cr4mxeqx5zb8rlakpfkg',
version: 1372275963,
signature: '63bfbca643baa9c86b7d2921d776628ac83a1b6e',
width: 864,
height: 576,
format: 'jpg',
resource_type: 'image',
created_at: '2017-06-26T19:46:03Z',
bytes: 120253,
type: 'upload',
url: 'https://res.cloudinary.com/demo/image/upload/v1372275963/cr4mxeqx5zb8rlakpfkg.jpg',
secure_url: 'https://res.cloudinary.com/demo/image/upload/v1372275963/cr4mxeqx5zb8rlakpfkg.jpg'
}
        */
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
    var result = photos.find({ id: captureId })

    try {
        // const filePath = path.join(appDir, `pictures/${captureId}.jpg`)
        // var contents = fs.readFileSync(filePath, 'utf8')

        res.send(result)
    } catch (error) {
        next(error)
    }
})

const getPictures = (req, res) => {
    res.send(photos.data)
}

module.exports = {
    getPicture,
    getPictures,
    takePicture
}
