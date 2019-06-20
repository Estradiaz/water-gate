import http from 'http'
const PINS: {[key: string]: boolean} = {}
Array.from({length: 10}, (_,i) => i).forEach(i => {

    PINS[`D${i}`] = false
})

function digitalWrite(pin: any, state: boolean){

    PINS[pin] = state
}
function digitalRead(pin){

    return PINS[pin]
}

const device = http.createServer((req, res) => {

    const parsed: string[] = (req.url && req.url.split('/') || []).slice(1)
    const [route, id, state] = parsed
    if(route === 'write'){

        digitalWrite(`D${id}`, !!state)
        res.writeHead(200)
        res.write(state)
        res.end()
    }
    if(route === 'read'){
        let responseData: string = ""
        if(/\d*/.test(id)){
            responseData = +digitalRead(`D${id}`) + ""
        } else {
            responseData = Array.from({length: 10}, (_,i) => i).map(i => {
                return +PINS[`D${i}`]
            }).join('')
        }
        res.writeHead(200)
        res.write(responseData)
        res.end()
    }
});

device.listen(3101, 'localhost', () => {

    console.info('device listening on 3101')
})