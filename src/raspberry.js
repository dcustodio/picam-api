const PiCamera = require('pi-camera')

const myCamera = new PiCamera({
    mode: 'photo',
    output: `${__dirname}/${'pb-' + (new Date()).getTime()}.jpg`,
    width: 640,
    height: 480,
    nopreview: true
})

module.exports = {

    takePicture: function () {
        return myCamera.snap()
    }

}
