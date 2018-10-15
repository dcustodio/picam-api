const raspberry = require('./raspberry')
const PiCamera = require('pi-camera')

function testCamera (){
	const myCamera = new PiCamera({
	    mode: 'photo',
	    output: `photo.jpg`,
	    width: 640,
	    height: 480,
	    nopreview: true
	})

        return myCamera.snap()
}

describe('testing raspberry', () => {
    it('should return a promise', () => {
        expect(raspberry.takePicture('delete')).rejects.toContainEqual("'raspistill' is not recognized as an internal or external command")
    })

	it('should', async () => {
	
	expect(testCamera()).resolves.toEqual({})

	

	})
})
