import express from 'express'
import minimist from 'minimist'

const {PORT, HOST} = minimist(process.argv.slice(2), {
    string: [
        'PORT',
        'HOST'
    ],
    alias: {
        'h': 'HOST',
        'p': 'PORT'
    },
    default: {
        PORT: 3101,
        HOST: 'localhost'
    }
})

const device = express();
device.use(express.urlencoded({extended: true}))
device.use(express.json())
let states = {}
device.get('/:device/:state', (req, res) => {

    console.log(req.url)
    const {device, state} = req.params
    states[device] = !!+state
    res.status(200).json(+!!states[device])
    console.log('res', +!!states[device])
})

device.get('/:device', (req, res) => {
    const {device} = req.params 
    res.status(200).json(+!!states[device])
    return;
})
device.get('/', (req, res) => {

    res.status(200).json(states)
})

device.listen(PORT, HOST, () => {

    console.info(`device listening on http://${HOST}:${PORT}`)
})