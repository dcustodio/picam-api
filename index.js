const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const pictureRoute = require('./routes/picture')

app.use(bodyParser.json())
app.get('/', (req, res) => res.send('pong!'))

app.post('/picture', pictureRoute.takePicture)
app.get('/picture/:captureId', pictureRoute.getPicture)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app
