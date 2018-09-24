const raspberry = require('./raspberry')

describe('testing raspberry', () => {
    it('should return a promise', () => {
        expect(raspberry.takePicture()).rejects.toContainEqual("'raspistill' is not recognized as an internal or external command")
    })
})
