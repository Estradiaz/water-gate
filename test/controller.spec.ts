import {describe, test} from 'mocha'
import WS from 'ws';
import axios from 'axios'

describe(
    'test websocket server handling',
    () => {
        test(
            'ws should connect to port 3001 wsServer within 2000ms', 
            () => {

                return new Promise((resolve, reject) => {

                    const ws = new WS('ws://localhost:3001');
                    ws.on('open', resolve)
                    ws.on('error', reject);
                })

            }

        ).timeout(2000)

        
    }
)

describe('data update behaviour', ()=> {

    test('put /device/:device should update | add device', async () => {

        const {data} = await axios.put('http://localhost:3002', {

            name: "testDevice",
            on: 'http://localhost:3101/1',
            off: 'http://localhost:3101/0',
        })
        console.log(data);
    })
    test('put /device should broadcast', async ()=>{

        const {data} = await axios.put('http://localhost:3002', {

            name: "testDevice",
            on: 'http://localhost:3101/1',
            off: 'http://localhost:3101/0',
        })
        console.log(data);
        
    }).timeout(2000)
})
