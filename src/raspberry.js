const PiCamera = require('pi-camera')
const path = require('path')
const appDir = path.dirname(require.main.filename)
const filePath = path.join(appDir, `pictures`)

module.exports = {

    takePicture: function (captureId) {
        const myCamera = new PiCamera({
            mode: 'photo',
            output: `${filePath}/${'pb-' + captureId}.jpg`,
            width: 640,
            height: 480,
            nopreview: true
        })

        return myCamera.snap()
    }
}
