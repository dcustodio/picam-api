const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = 3000
const pictureRoute = require('./routes/picture')
const debug = require('debug')('main')

app.use(bodyParser.json())

// var corsOptions = {
//     origin: 'http://localhost:8080',
//     optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

app.use(cors())

app.get('/ping', (req, res) => res.send('pong!'))

app.post('/picture', pictureRoute.takePicture)
// app.post('/picture',function(req,res,next){
//	res.json({msg: 'hello'})
// })
app.get('/picture/:captureId', pictureRoute.getPicture)

app.get('/picture/', pictureRoute.getPictures)

app.listen(port, () => debug(`Example app listening on port ${port}!`))

module.exports = app
