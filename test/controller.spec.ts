import {describe, test} from 'mocha'
import {expect} from 'chai'
import WS from 'ws';
import axios from 'axios'


describe(
    'test websocket server handling',
    () => {
        test(
            'ws should connect to port 3001 wsServer within 2000ms', 
            (done) => {

                    new Promise((resolve, reject) => {
    
                        const ws = new WS('ws://localhost:3001');
                        ws.on('open', () => done())
                        ws.on('error', done);
                    })
            }

        ).timeout(2000)

        
    }
)

describe('data update behaviour', ()=> {

    test('get should get all current devices', (done) => {
        (async () => {

            try{
    
                await axios.get('http://localhost:3002/device/')
                done();
            } catch (e){
    
                done(e)
            }
        })()

    }).timeout(2000);
    test('put /device/:device should update | add device', (done) => {
        (async () => {
            let {data: getData1} = await axios.get('http://localhost:3002/device/')    
            const data = await axios.put('http://localhost:3002/device/', {
                
                name: "testDevice",
                on: 'http://localhost:3101/1',
                off: 'http://localhost:3101/0',
            })
            let {data: getData2} = await axios.get('http://localhost:3002/device/')    
            try {

                expect(getData1.length).to.eq(getData2.length - 1)
                done()
            } catch (e) {

                done(e)
            }
        })()
    }).timeout(2000)

    test('put /device should broadcast', (done)=>{
        (async () => {
        await new Promise((resolve, reject) => {

            const ws = new WS('ws://localhost:3001');
            ws.on('open', resolve)
            ws.on('message', (msg) => {

                done()
            })
            ws.on('error', reject);
        })
        const {data} = await axios.put('http://localhost:3002/device', {

            name: "testDevice",
            on: 'http://localhost:3101/1',
            off: 'http://localhost:3101/0',
        })
        
        })()
    }).timeout(2000)
})
