import express from 'express'

const device = express();
device.use(express.urlencoded({extended: true}))
device.use(express.json())
let state = false
device.put(':state', (req, res) => {

    state = !!req.params.state
    console.log(state, req.ip)
    res.send(state)
})

device.listen(3101, 'localhost', () => {

    console.info('device listening on 3101')
})