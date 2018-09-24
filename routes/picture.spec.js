const request = require('supertest')

const app = require('../index')

describe('Test the root path', () => {
    it('should response the GET method', async () => {
        const response = await request(app).get('/')

        expect(response.statusCode).toBe(200)
    })
})
