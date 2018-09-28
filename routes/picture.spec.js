const request = require('supertest')

const app = require('../index')

describe('Test the paths', () => {
    it('should response / the GET method', async () => {
        const response = await request(app).get('/')

        expect(response.statusCode).toBe(200)
    })

    it('should error on a /picture the Post method without capture id', async () => {
        const response = await request(app).post('/picture').send()

        expect(response.statusCode).toBe(400)
    })

    it('should error on a /picture the Post method with capture  but disconnected hardware', async () => {
        const response = await request(app).post('/picture').send({ captureId: 1 })

        expect(response.statusCode).toBe(500)
    })
})
